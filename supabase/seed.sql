-- ==============================================================================
-- EDUNITE2SERVE INITIAL DATA SEED SCRIPT
-- Run this in Supabase SQL Editor after running schema.sql
-- ==============================================================================

-- SEED PROJECTS
INSERT INTO public.projects (slug, title, category, location, description, highlight, image, impact_metrics, is_featured, is_published)
VALUES
(
  'lakeside-farm',
  'Lake Side Edunite2Serve Farm',
  'Sustainable Farming',
  'Malawi Adventist University and nearby communities',
  'The Lakeside farming initiative cultivates organic crops, grains, and vegetables to help support under-resourced university students and vulnerable families in surrounding communities with nutrition and practical bio-intensive agricultural training.',
  'Growing food with direct student & community benefit',
  '/images/featured-projects/lakeside-farm.jpg',
  '10+ Acres cultivated · Hundreds of student meals supported',
  true,
  true
),
(
  'mangunda-school',
  'Mangunda Adventist Primary School',
  'Child Education',
  'Thyolo, Southern Region, Malawi',
  'Mangunda serves more than 200 young learners across Standards 1–7. Edunite2Serve supports vital classroom rehabilitation, learning materials, and student wellbeing to overcome severe facility deficits and give every child a dignifying educational start.',
  '200+ learners · Standards 1–7',
  '/images/featured-projects/mangunda-school.jpg',
  '200+ active primary students · Daily educational support',
  true,
  true
),
(
  'give-hope-malawi',
  'Give-HOPE Malawi Partnership',
  'Community Care',
  'Across 15 projects in Malawi',
  'Through its close strategic collaboration with Give-HOPE, Edunite2Serve provides educational sponsorships, spiritual guidance, and compassionate social welfare for vulnerable children and community support clubs across Malawi.',
  'Active work across 15 community projects in Malawi',
  '/images/featured-projects/give-hope-malawi.jpg',
  '15 grassroots project centers across central and southern Malawi',
  true,
  true
),
(
  'community-orchard',
  'Kamwisa Community Orchard',
  'Food Access',
  'Kamwisa, Traditional Authority Kachindamoto',
  'Established in 2021, this community orchard was planted to make a wide variety of nutritious fruits affordable and accessible to local households, while teaching regenerative soil care and perennial tree stewardship.',
  'Community orchard launched in 2021',
  '/images/featured-projects/lakeside-farm.jpg',
  'Diverse fruit tree varieties · Ongoing seasonal harvest',
  false,
  true
),
(
  'church-construction',
  'Malawi Churches Construction',
  'Community Infrastructure',
  'Rural communities across Malawi',
  'With generous funding from international partners and US supporters, Edunite2Serve helps rural congregations build durable brick churches and community assembly halls, creating safe shelters for worship, youth development, and emergency aid.',
  'Durable worship and community assembly spaces',
  '/images/featured-projects/church-construction.jpg',
  'Safe, weather-resistant sanctuary and community centers',
  false,
  true
),
(
  'farm-stew',
  'FARM STEW International',
  'Healthy Living',
  'Zomba, Dedza & Nationwide',
  'Through the holistic FARM STEW recipe (Farming, Attitude, Rest, Meals, Sanitation, Temperance, Enterprise, Water), local certified trainers empower families with life-changing skills in plant-based nutrition, hygiene, clean water, and micro-enterprise.',
  'Practical skills for healthier, self-reliant lives',
  '/images/featured-projects/farmstew-international.jpg',
  'Hundreds trained in holistic wellness and organic gardening',
  false,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- SEED TESTIMONIALS
INSERT INTO public.testimonials (title, author, quote, accent, icon, rating, is_published)
VALUES
(
  'Healthy Food',
  'Becky Vermilyea',
  'A successful cooking class series was held with 16 enthusiastic participants. Their families are now enjoying new, healthy meals and the graduates are already sharing their new skills with others. More classes planned for the future.',
  'teal',
  'healthy-food',
  5,
  true
),
(
  'Farming',
  'Joy Kauffman',
  'We sincerely thank all our donors for your generous support of FARM STEW International''s work in Malawi. Your contributions have played a vital role in empowering families and communities through life-changing training in farming, nutrition, sanitation, entrepreneurship, and spiritual health. Because of your partnership, more people are gaining the knowledge and tools they need to live healthier, more self-reliant lives. We are deeply grateful for your continued compassion and investment in sustainable change-may your kindness be richly rewarded.',
  'orange',
  'farming',
  5,
  true
),
(
  'Child Education',
  'Prof. S. Pittman',
  'We extend our heartfelt gratitude to all our generous donors for the invaluable support you have provided to Mangunda Adventist Primary School. Your contributions-whether financial, material, or through services-have made a meaningful difference in the lives of our learners and the growth of our school.',
  'gold',
  'education',
  5,
  true
);

-- SEED TEAM MEMBERS
INSERT INTO public.team_members (name, role, bio, initials, order_index)
VALUES
('Prof. Sharon Pittman', 'Founder & International Director', 'Visionary educator and humanitarian researcher who established Edunite2Serve to bridge resources between international supporters and Malawian communities in need.', 'SP', 1),
('Grey Sagawa', 'Chief Executive Officer (CEO)', 'Leads organizational strategy, field operations, and community partner alignment across all Edunite2Serve initiatives in Malawi.', 'GS', 2),
('Juliet Dzikolo', 'Chief Finance Officer (CFO)', 'Oversees financial management, donor reporting, compliance, and transparent resource disbursement for community projects.', 'JD', 3),
('Moses Chikopa', 'Director of Mangunda Primary & Give-Hope Coordinator', 'Directs educational programs at Mangunda Adventist Primary School and coordinates national initiatives with Give-HOPE Malawi.', 'MC', 4),
('Dr. W. Mwale', 'FARM STEW Country Coordinator', 'Pioneers sustainable farming, public health, and holistic nutrition training modules across regional learning centers.', 'WM', 5);
