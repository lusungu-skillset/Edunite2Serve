const fs = require('fs');
const path = require('path');

const outDir = __dirname;

function stripHtml(html) {
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
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

async function run() {
  const endpoints = [
    { name: 'pages', url: 'https://edunite2serve.org/wp-json/wp/v2/pages?per_page=100' },
    { name: 'posts', url: 'https://edunite2serve.org/wp-json/wp/v2/posts?per_page=100' },
    { name: 'projects', url: 'https://edunite2serve.org/wp-json/wp/v2/project?per_page=100' },
    { name: 'team', url: 'https://edunite2serve.org/wp-json/wp/v2/team?per_page=100' },
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url);
      if (res.ok) {
        const data = await res.json();
        fs.writeFileSync(path.join(outDir, `${ep.name}.json`), JSON.stringify(data, null, 2), 'utf8');
        console.log(`Saved ${ep.name}.json (${data.length} items)`);
      }
    } catch (e) {
      console.error(ep.name, e.message);
    }
  }

  const pages = JSON.parse(fs.readFileSync(path.join(outDir, 'pages.json'), 'utf8'));
  for (const p of pages) {
    if (p.content?.rendered) {
      const text = stripHtml(p.content.rendered);
      if (text.length > 10) {
        fs.writeFileSync(path.join(outDir, `${p.slug}.txt`), text, 'utf8');
      }
    }
  }

  const posts = JSON.parse(fs.readFileSync(path.join(outDir, 'posts.json'), 'utf8'));
  for (const post of posts) {
    const text = stripHtml(post.content.rendered);
    fs.writeFileSync(path.join(outDir, `post-${post.id}-${post.slug}.txt`), text, 'utf8');
  }

  const team = JSON.parse(fs.readFileSync(path.join(outDir, 'team.json'), 'utf8'));
  fs.writeFileSync(path.join(outDir, 'team-summary.json'), JSON.stringify(team.map(t => ({
    id: t.id,
    title: t.title.rendered,
    content: stripHtml(t.content?.rendered),
    excerpt: stripHtml(t.excerpt?.rendered)
  })), null, 2), 'utf8');

  console.log('Finished extracting all clean content files!');
}

run();
