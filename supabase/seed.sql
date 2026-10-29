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
DELETE FROM public.team_members;

INSERT INTO public.team_members (name, role, bio, initials, order_index)
VALUES
('Sharon Pittman', 'Executive Lead', 'Leads Edunite2Serve and its teams.', 'SP', 1),
('Sinthan Mollen', 'Meal Lead', 'Leads the meal team.', 'SM', 2),
('John Chepe', 'Marketing & ICT Lead', 'Leads marketing and ICT.', 'JC', 3),
('Trinna Mphulla', 'Operations Lead / Agents of Change Lead', 'Leads operations and the Agents of Change program.', 'TM', 4),
('Juliet Dzikolo', 'Finance Lead', 'Leads the finance team.', 'JD', 5),
('Grey Sagawa', 'FS Field Lead', 'Leads the FARM STEW field team.', 'GS', 6),
('Bertha Malonda', 'Southern Region Team Lead', 'Southern region team lead; oversees 9 trainers.', 'BM', 7),
('Peter Kaniye', 'Central Region Team Lead', 'Central region team lead; oversees 8 trainers.', 'PK', 8),
('Dr Wilbert Mwale', 'Northern Region Team Lead', 'Northern region team lead; oversees 6 trainers.', 'DW', 9),
('Joyce Dzinjalamala', 'VLC Lead', 'Leads the Virtual Learning Community.', 'JD', 10),
('Jane Meja', 'Learner Engagement', 'Supports learner engagement in the Virtual Learning Community.', 'JM', 11),
('Tonneck Makhongo', 'Technical Lead', 'Leads the Virtual Learning Community technical team.', 'TM', 12),
('Nohemi Ventura', 'Spanish Specialist', 'Virtual Learning Community language specialist.', 'NV', 13),
('Joydlynn Rivero', 'Filipino Specialist', 'Virtual Learning Community language specialist.', 'JR', 14),
('Reeem Ayoub', 'Arabic Specialist', 'Virtual Learning Community language specialist.', 'RA', 15),
('Edna Osindeh', 'Swahili Specialist', 'Virtual Learning Community language specialist.', 'EO', 16),
('Patrice Baranzika', 'French Specialist', 'Virtual Learning Community language specialist.', 'PB', 17),
('Suma Sagma', 'Bangla Specialist', 'Virtual Learning Community language specialist.', 'SS', 18),
('Philip Javaid', 'Urdu Specialist', 'Virtual Learning Community language specialist.', 'PJ', 19),
('Ayinalem Dirbaba', 'Oromo & Portuguese Specialist', 'Virtual Learning Community language specialist.', 'AD', 20),
('Maria Harawa', 'Mangunda Hope School Head Teacher', 'Leads the Mangunda Hope School team.', 'MH', 21),
('Deborah Ngulube', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'DN', 22),
('John Kachere', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'JK', 23),
('Mark David', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'MD', 24),
('Jacqueline Chilabade', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'JC', 25),
('Yankho Muhanda', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'YM', 26),
('Evelyn Mankhwala', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'EM', 27),
('Joseph Khambadza', 'FS Teacher', 'FARM STEW teacher at Mangunda Hope School.', 'JK', 28),
('Zinenani Chijere Chirwa', 'Enterprise Lead', 'Leads the enterprise team.', 'ZC', 29),
('Wezie Basikolo', 'Enterprise Assistant', 'Enterprise assistant reporting to Zinenani Chijere Chirwa.', 'WB', 30),
('Arnold Banda', 'Afripads Lead', 'Leads the Afripads team.', 'AB', 31),
('Chrissy Gondwe', 'Afripads Assistant', 'Afripads assistant reporting to Arnold Banda.', 'CG', 32),
('Moses Chilopa', 'Give-HOPE Lead', 'Leads the Give-HOPE team.', 'MC', 33),
('Kingford Zakunja', 'Program Manager Intern / Program Manager', 'Give-HOPE program manager intern and program manager.', 'KZ', 34),
('Kera Mkanda Wire', 'Adventist Youth Ministries Lead', 'Adventist Youth Ministries lead in the Give-HOPE team.', 'KM', 35),
('Raphael M''Meto', 'Office Secretary', 'Office secretary in the Give-HOPE team.', 'RM', 36);

UPDATE public.team_members
SET department = CASE
  WHEN name = 'Sharon Pittman' THEN 'Leadership'
  WHEN name = 'Sinthan Mollen' THEN 'Meal Team'
  WHEN name = 'John Chepe' THEN 'Marketing & ICT'
  WHEN name = 'Trinna Mphulla' THEN 'Operations'
  WHEN name = 'Juliet Dzikolo' THEN 'Finance'
  WHEN name IN ('Grey Sagawa', 'Bertha Malonda', 'Peter Kaniye', 'Dr Wilbert Mwale') THEN 'FARM STEW'
  WHEN name IN (
    'Joyce Dzinjalamala', 'Jane Meja', 'Tonneck Makhongo', 'Nohemi Ventura',
    'Joydlynn Rivero', 'Reeem Ayoub', 'Edna Osindeh', 'Patrice Baranzika',
    'Suma Sagma', 'Philip Javaid', 'Ayinalem Dirbaba'
  ) THEN 'Virtual Learning Community'
  WHEN name IN (
    'Maria Harawa', 'Deborah Ngulube', 'John Kachere', 'Mark David',
    'Jacqueline Chilabade', 'Yankho Muhanda', 'Evelyn Mankhwala', 'Joseph Khambadza'
  ) THEN 'Mangunda Hope School'
  WHEN name IN ('Zinenani Chijere Chirwa', 'Wezie Basikolo', 'Arnold Banda', 'Chrissy Gondwe') THEN 'Enterprise'
  WHEN name IN ('Moses Chilopa', 'Kingford Zakunja', 'Kera Mkanda Wire', 'Raphael M''Meto') THEN 'Give-HOPE'
  WHEN role ILIKE '%office%' OR role ILIKE '%operations%' THEN 'Operations'
  ELSE 'General'
END;

UPDATE public.team_members
SET image = CASE name
  WHEN 'Sharon Pittman' THEN '/images/team/sharon-pittman.jpg'
  WHEN 'Juliet Dzikolo' THEN '/images/team/juliet-dzikolo.jpg'
  WHEN 'Grey Sagawa' THEN '/images/team/grey-sagawa.jpg'
  WHEN 'Dr Wilbert Mwale' THEN '/images/team/dr-w-mwale.jpg'
  WHEN 'Moses Chilopa' THEN '/images/team/moses-chikopa.jpg'
  ELSE image
END;
