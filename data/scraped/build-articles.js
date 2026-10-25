const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf8'));

const mediaMap = {
  4695: 'https://edunite2serve.org/wp-content/uploads/2025/01/IMG-20250227-WA0002.jpg',
  4225: 'https://edunite2serve.org/wp-content/uploads/2025/06/IMG-20250528-WA0032.jpg',
  4692: 'https://edunite2serve.org/wp-content/uploads/2025/01/IMG-20250303-WA0322.jpg',
  4262: 'https://edunite2serve.org/wp-content/uploads/2025/06/IMG_3533-scaled.jpg',
  4673: 'https://edunite2serve.org/wp-content/uploads/2025/07/IMG-20250709-WA0046-1.jpg',
  4257: 'https://edunite2serve.org/wp-content/uploads/2025/06/IMG_0815-Copy-scaled.jpg',
  4724: 'https://edunite2serve.org/wp-content/uploads/2025/01/download-2.png'
};

function strip(html) {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '--')
    .replace(/&amp;/g, '&')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .join('\n\n');
}

const articles = posts
  .filter(p => p.slug !== 'donate')
  .map(p => {
    const rawTitle = p.title.rendered.replace(/&#8217;/g, "'").replace(/&amp;/g, '&');
    let category = 'Community Care';
    if (rawTitle.includes('Cookery') || rawTitle.includes('Vegetarian')) category = 'Nutrition & Health';
    else if (rawTitle.includes('School') || rawTitle.includes('Montessori') || rawTitle.includes('Children')) category = 'Education';
    else if (rawTitle.includes('Farmstew') || rawTitle.includes('Land')) category = 'Sustainable Agriculture';
    else if (rawTitle.includes('Students') || rawTitle.includes('Club')) category = 'Youth Empowerment';

    const cleanContent = strip(p.content.rendered);
    const cleanExcerpt = strip(p.excerpt.rendered) || cleanContent.slice(0, 160) + '...';

    return {
      id: p.id,
      slug: p.slug,
      title: rawTitle,
      date: p.date.split('T')[0],
      formattedDate: new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: 'Edunite2Serve Malawi',
      category,
      readTime: '3 min read',
      excerpt: cleanExcerpt,
      content: cleanContent,
      image: mediaMap[p.featured_media] || '/images/homepage-community-learning.jpg'
    };
  });

fs.writeFileSync(path.join(__dirname, '..', 'articles.json'), JSON.stringify(articles, null, 2), 'utf8');
console.log('Successfully written', articles.length, 'articles to data/articles.json');
