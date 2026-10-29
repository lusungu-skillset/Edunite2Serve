-- Extend the team roster for the public directory and admin editor.
ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS department TEXT NOT NULL DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;

-- Normalize the older seed names while avoiding duplicate directory entries.
UPDATE public.team_members
SET name = 'Sharon Pittman'
WHERE name = 'Prof. Sharon Pittman'
  AND NOT EXISTS (SELECT 1 FROM public.team_members WHERE name = 'Sharon Pittman');
DELETE FROM public.team_members
WHERE name = 'Prof. Sharon Pittman'
  AND EXISTS (SELECT 1 FROM public.team_members WHERE name = 'Sharon Pittman');

UPDATE public.team_members
SET name = 'Moses Chilopa'
WHERE name = 'Moses Chikopa'
  AND NOT EXISTS (SELECT 1 FROM public.team_members WHERE name = 'Moses Chilopa');
DELETE FROM public.team_members
WHERE name = 'Moses Chikopa'
  AND EXISTS (SELECT 1 FROM public.team_members WHERE name = 'Moses Chilopa');

UPDATE public.team_members
SET name = 'Dr Wilbert Mwale'
WHERE name = 'Dr. W. Mwale'
  AND NOT EXISTS (SELECT 1 FROM public.team_members WHERE name = 'Dr Wilbert Mwale');
DELETE FROM public.team_members
WHERE name = 'Dr. W. Mwale'
  AND EXISTS (SELECT 1 FROM public.team_members WHERE name = 'Dr Wilbert Mwale');

CREATE TEMP TABLE team_directory_import (
  name TEXT,
  role TEXT,
  bio TEXT,
  initials TEXT,
  department TEXT,
  image TEXT,
  order_index INT
);

INSERT INTO team_directory_import (name, role, bio, initials, department, image, order_index)
VALUES
  ('Sharon Pittman', 'Executive Lead', 'Leads Edunite2Serve and its teams.', 'SP', 'Leadership', '/images/team/sharon-pittman.jpg', 1),
  ('Sinthan Mollen', 'Meal Lead', 'Leads the meal team.', 'SM', 'Meal Team', NULL, 2),
  ('John Chepe', 'Marketing & ICT Lead', 'Leads marketing and ICT.', 'JC', 'Marketing & ICT', NULL, 3),
  ('Trinna Mphulla', 'Operations Lead / Agents of Change Lead', 'Leads operations and the Agents of Change program.', 'TM', 'Operations', NULL, 4),
  ('Juliet Dzikolo', 'Finance Lead', 'Leads the finance team.', 'JD', 'Finance', '/images/team/juliet-dzikolo.jpg', 5),
  ('Grey Sagawa', 'FS Field Lead', 'Leads the FARM STEW field team.', 'GS', 'FARM STEW', '/images/team/grey-sagawa.jpg', 6),
  ('Bertha Malonda', 'Southern Region Team Lead', 'Southern region team lead; oversees 9 trainers.', 'BM', 'FARM STEW', NULL, 7),
  ('Peter Kaniye', 'Central Region Team Lead', 'Central region team lead; oversees 8 trainers.', 'PK', 'FARM STEW', NULL, 8),
  ('Dr Wilbert Mwale', 'Northern Region Team Lead', 'Northern region team lead; oversees 6 trainers.', 'DW', 'FARM STEW', '/images/team/dr-w-mwale.jpg', 9),
  ('Joyce Dzinjalamala', 'VLC Lead', 'Leads the Virtual Learning Community.', 'JD', 'Virtual Learning Community', NULL, 10),
  ('Jane Meja', 'Learner Engagement', 'Supports learner engagement in the Virtual Learning Community.', 'JM', 'Virtual Learning Community', NULL, 11),
  ('Tonneck Makhongo', 'Technical Lead', 'Leads the Virtual Learning Community technical team.', 'TM', 'Virtual Learning Community', NULL, 12),
  ('Nohemi Ventura', 'Spanish Specialist', 'Virtual Learning Community language specialist.', 'NV', 'Virtual Learning Community', NULL, 13),
  ('Joydlynn Rivero', 'Filipino Specialist', 'Virtual Learning Community language specialist.', 'JR', 'Virtual Learning Community', NULL, 14),
  ('Reeem Ayoub', 'Arabic Specialist', 'Virtual Learning Community language specialist.', 'RA', 'Virtual Learning Community', NULL, 15),
  ('Edna Osindeh', 'Swahili Specialist', 'Virtual Learning Community language specialist.', 'EO', 'Virtual Learning Community', NULL, 16),
  ('Patrice Baranzika', 'French Specialist', 'Virtual Learning Community language specialist.', 'PB', 'Virtual Learning Community', NULL, 17),
  ('Suma Sagma', 'Bangla Specialist', 'Virtual Learning Community language specialist.', 'SS', 'Virtual Learning Community', NULL, 18),
  ('Philip Javaid', 'Urdu Specialist', 'Virtual Learning Community language specialist.', 'PJ', 'Virtual Learning Community', NULL, 19),
  ('Ayinalem Dirbaba', 'Oromo & Portuguese Specialist', 'Virtual Learning Community language specialist.', 'AD', 'Virtual Learning Community', NULL, 20),
  ('Maria Harawa', 'Mangunda Hope School Head Teacher', 'Leads the Mangunda Hope School team.', 'MH', 'Mangunda Hope School', NULL, 21),
  ('Deborah Ngulube', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'DN', 'Mangunda Hope School', NULL, 22),
  ('John Kachere', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'JK', 'Mangunda Hope School', NULL, 23),
  ('Mark David', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'MD', 'Mangunda Hope School', NULL, 24),
  ('Jacqueline Chilabade', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'JC', 'Mangunda Hope School', NULL, 25),
  ('Yankho Muhanda', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'YM', 'Mangunda Hope School', NULL, 26),
  ('Evelyn Mankhwala', 'Mangunda Hope School Team', 'Member of the Mangunda Hope School team.', 'EM', 'Mangunda Hope School', NULL, 27),
  ('Joseph Khambadza', 'FS Teacher', 'FARM STEW teacher at Mangunda Hope School.', 'JK', 'Mangunda Hope School', NULL, 28),
  ('Zinenani Chijere Chirwa', 'Enterprise Lead', 'Leads the enterprise team.', 'ZC', 'Enterprise', NULL, 29),
  ('Wezie Basikolo', 'Enterprise Assistant', 'Enterprise assistant reporting to Zinenani Chijere Chirwa.', 'WB', 'Enterprise', NULL, 30),
  ('Arnold Banda', 'Afripads Lead', 'Leads the Afripads team.', 'AB', 'Enterprise', NULL, 31),
  ('Chrissy Gondwe', 'Afripads Assistant', 'Afripads assistant reporting to Arnold Banda.', 'CG', 'Enterprise', NULL, 32),
  ('Moses Chilopa', 'Give-HOPE Lead', 'Leads the Give-HOPE team.', 'MC', 'Give-HOPE', '/images/team/moses-chikopa.jpg', 33),
  ('Kingford Zakunja', 'Program Manager Intern / Program Manager', 'Give-HOPE program manager intern and program manager.', 'KZ', 'Give-HOPE', NULL, 34),
  ('Kera Mkanda Wire', 'Adventist Youth Ministries Lead', 'Adventist Youth Ministries lead in the Give-HOPE team.', 'KM', 'Give-HOPE', NULL, 35),
  ('Raphael M''Meto', 'Office Secretary', 'Office secretary in the Give-HOPE team.', 'RM', 'Give-HOPE', NULL, 36);

UPDATE public.team_members AS member
SET department = roster.department,
    image = COALESCE(member.image, roster.image),
    order_index = CASE WHEN member.order_index = 0 THEN roster.order_index ELSE member.order_index END
FROM team_directory_import AS roster
WHERE member.name = roster.name;

-- Replace only the outdated sample seed descriptions; preserve existing admin edits.
UPDATE public.team_members AS member
SET role = roster.role,
    bio = roster.bio,
    initials = roster.initials
FROM team_directory_import AS roster
WHERE member.name = roster.name
  AND (
    (member.name = 'Sharon Pittman' AND member.role = 'Founder & International Director')
    OR (member.name = 'Grey Sagawa' AND member.role = 'Chief Executive Officer (CEO)')
    OR (member.name = 'Juliet Dzikolo' AND member.role = 'Chief Finance Officer (CFO)')
    OR (member.name = 'Moses Chilopa' AND member.role = 'Director of Mangunda Primary & Give-Hope Coordinator')
    OR (member.name = 'Dr Wilbert Mwale' AND member.role = 'FARM STEW Country Coordinator')
  );

INSERT INTO public.team_members (name, role, bio, initials, department, image, order_index)
SELECT roster.name, roster.role, roster.bio, roster.initials, roster.department,
       roster.image, roster.order_index
FROM team_directory_import AS roster
WHERE NOT EXISTS (
  SELECT 1 FROM public.team_members AS member WHERE member.name = roster.name
);

DROP TABLE team_directory_import;

CREATE INDEX IF NOT EXISTS team_members_department_order_idx
  ON public.team_members (department, order_index);

DROP POLICY IF EXISTS "Public read team members" ON public.team_members;
CREATE POLICY "Public read team members" ON public.team_members
  FOR SELECT USING (is_published = true);
