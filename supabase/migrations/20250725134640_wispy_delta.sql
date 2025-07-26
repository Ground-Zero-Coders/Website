/*
  # Initial Schema for Ground Zero Coders

  1. New Tables
    - `mentors`
      - `id` (text, primary key) - login ID
      - `password` (text) - plaintext password for now
      - `name` (text) - mentor's full name
      - `email` (text) - mentor's email
      - `department` (text) - mentor's department
      - `join_date` (date) - when mentor joined
      - `created_at` (timestamp)
    
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text) - project name
      - `github` (text) - GitHub repository URL
      - `mentee` (text) - mentee name(s)
      - `mentor` (text) - mentor name
      - `mentor_id` (text) - references mentors.id
      - `date` (date) - project date
      - `group` (text) - project group/category
      - `description` (text) - project description
      - `image` (text) - project image URL
      - `occasion` (text) - event/occasion
      - `status` (text) - project status
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated access
*/

-- Create mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id text PRIMARY KEY,
  password text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  department text NOT NULL,
  join_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  github text,
  mentee text NOT NULL,
  mentor text NOT NULL,
  mentor_id text NOT NULL REFERENCES mentors(id),
  date date NOT NULL,
  "group" text NOT NULL,
  description text,
  image text,
  occasion text,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for mentors table
CREATE POLICY "Mentors can read all mentor data"
  ON mentors
  FOR SELECT
  TO public
  USING (true);

-- Create policies for projects table
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Mentors can manage their own projects"
  ON projects
  FOR ALL
  TO public
  USING (true);

-- Insert sample mentors
INSERT INTO mentors (id, password, name, email, department, join_date) VALUES
  ('mentor-001', 'sarah2024', 'Dr. Sarah Johnson', 'sarah.johnson@groundzerocoders.org', 'Web Development', '2023-08-15'),
  ('mentor-002', 'mike2024', 'Prof. Mike Davis', 'mike.davis@groundzerocoders.org', 'Artificial Intelligence', '2023-09-01');

-- Insert sample projects
INSERT INTO projects (name, github, mentee, mentor, mentor_id, date, "group", description, image, occasion, status) VALUES
  (
    'E-Commerce Platform',
    'https://github.com/groundzerocoders/ecommerce-platform',
    'Alex Chen, Maria Rodriguez',
    'Dr. Sarah Johnson',
    'mentor-001',
    '2024-01-15',
    'Web Development',
    'Full-stack e-commerce solution with modern UI/UX and payment integration',
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    'Hackathon 2024',
    'completed'
  ),
  (
    'AI-Powered Chatbot',
    'https://github.com/groundzerocoders/ai-chatbot',
    'Kevin Park, Lisa Wang',
    'Prof. Mike Davis',
    'mentor-002',
    '2024-01-20',
    'Artificial Intelligence',
    'Natural language processing chatbot with ML capabilities and voice integration',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    'AI Workshop',
    'completed'
  ),
  (
    'Mobile Fitness App',
    'https://github.com/groundzerocoders/fitness-app',
    'David Kim',
    'Dr. Sarah Johnson',
    'mentor-001',
    '2024-02-01',
    'Mobile Development',
    'Cross-platform fitness tracking with social features and gamification',
    'https://images.pexels.com/photos/4156467/pexels-photo-4156467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    'Mobile Dev Challenge',
    'in-progress'
  ),
  (
    'Weather Prediction ML Model',
    'https://github.com/groundzerocoders/weather-ml',
    'Sophie Miller, John Davis',
    'Prof. Mike Davis',
    'mentor-002',
    '2024-02-15',
    'Data Science',
    'Machine learning model for accurate weather prediction using historical data',
    'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    'Data Science Workshop',
    'in-progress'
  ),
  (
    'Social Media Analytics Dashboard',
    'https://github.com/groundzerocoders/social-analytics',
    'Michael Chang, Olivia Smith',
    'Dr. Sarah Johnson',
    'mentor-001',
    '2024-02-25',
    'Data Visualization',
    'Real-time social media analytics dashboard with sentiment analysis',
    'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    'Analytics Challenge',
    'completed'
  );