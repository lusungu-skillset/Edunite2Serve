-- Add directory fields and policies only; staff records are created in the admin panel.
ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS department TEXT NOT NULL DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS team_members_department_order_idx
  ON public.team_members (department, order_index);

DROP POLICY IF EXISTS "Public read team members" ON public.team_members;
CREATE POLICY "Public read team members" ON public.team_members
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admin full team access" ON public.team_members;
CREATE POLICY "Admin full team access" ON public.team_members
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

NOTIFY pgrst, 'reload schema';
