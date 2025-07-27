CREATE TABLE IF NOT EXISTS mentees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  group_name text,
  mentor_id text REFERENCES mentors(id),
  domain text,
  github_id text,
  join_date date NOT NULL DEFAULT CURRENT_DATE,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);


ALTER TABLE mentees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read mentees"
  ON mentees
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage mentees"
  ON mentees
  FOR ALL
  TO public
  USING (true);


INSERT INTO mentees (name, email, group_name, mentor_id, domain, github_id, join_date, status) VALUES
  ('Alex Chen', 'alex.chen@student.org', 'Web Warriors', 'shreya9387', 'Frontend Development', 'alexchen-dev', '2024-01-10', 'active'),
  ('Maria Rodriguez', 'maria.rodriguez@student.org', 'Web Warriors', 'shreya9387', 'Backend Development', 'maria-rodriguez', '2024-01-10', 'active'),
  ('Kevin Park', 'kevin.park@student.org', 'AI Pioneers', 'arein4003', 'Machine Learning', 'kevinpark-ai', '2024-01-10', 'active'),
  ('Lisa Wang', 'lisa.wang@student.org', 'AI Pioneers', 'arein4003', 'Deep Learning', 'lisa-wang-ai', '2024-01-10', 'active'),
  ('David Kim', 'david.kim@student.org', 'Mobile Masters', 'paridhi9316', 'Mobile Development', 'david-kim-mobile', '2024-01-12', 'active'),
  ('Sophie Miller', 'sophie.miller@student.org', 'Data Wizards', 'aryan3206', 'Data Science', 'sophie-data', '2024-01-15', 'active'),
  ('John Davis', 'john.davis@student.org', 'Data Wizards', 'aryan3206', 'Statistical Analysis', 'john-stats', '2024-01-15', 'active'),
  ('Michael Chang', 'michael.chang@student.org', 'Analytics Team', 'paridhi9316', 'Data Visualization', 'michael-viz', '2024-01-18', 'active'),
  ('Olivia Smith', 'olivia.smith@student.org', 'Analytics Team', 'paridhi9316', 'Business Intelligence', 'olivia-bi', '2024-01-18', 'active');
