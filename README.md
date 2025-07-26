# Ground Zero Coders - Supabase Integration

This project has been refactored to use Supabase for dynamic data management instead of hardcoded data files.

## 🚀 Setup Instructions

### 1. Supabase Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Go to **Settings > API** and copy:
   - Project URL
   - anon/public key

### 2. Environment Configuration

The environment variables are already configured with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hceehmxkiwheaaceouvd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire content from `supabase/migrations/create_initial_schema.sql`
4. Click **Run** to execute the migration

This will create:
- `mentors` table with sample data
- `projects` table with sample data
- Proper Row Level Security (RLS) policies

### 4. Run the Application

```bash
npm install
npm run dev
```

## 📊 Database Schema

### Mentors Table
- `id` (text, primary key) - Login ID
- `password` (text) - Password (plaintext for now)
- `name` (text) - Full name
- `email` (text) - Email address
- `department` (text) - Department
- `join_date` (date) - Join date
- `created_at` (timestamp) - Created timestamp

### Projects Table
- `id` (uuid, primary key) - Auto-generated ID
- `name` (text) - Project name
- `github` (text) - GitHub repository URL
- `mentee` (text) - Mentee name(s)
- `mentor` (text) - Mentor name
- `mentor_id` (text) - References mentors.id
- `date` (date) - Project date
- `group` (text) - Project category/group
- `description` (text) - Project description
- `image` (text) - Project image URL
- `occasion` (text) - Event/occasion
- `status` (text) - Project status
- `created_at` (timestamp) - Created timestamp

## 🔐 Sample Login Credentials

Use these credentials to test the admin portal:

- **Mentor ID**: `mentor-001`
- **Password**: `sarah2024`

OR

- **Mentor ID**: `mentor-002`
- **Password**: `mike2024`

## 🛠 Managing Data

### Adding New Projects

You can add new projects directly in Supabase:

1. Go to **Table Editor > projects**
2. Click **Insert > Insert row**
3. Fill in the required fields:
   - `name`: Project name
   - `mentee`: Mentee name(s)
   - `mentor`: Mentor name
   - `mentor_id`: Must match an existing mentor ID
   - `date`: Project date
   - `group`: Category (Web Development, AI, etc.)
   - `description`: Project description
   - `image`: Image URL (optional)
   - `github`: GitHub repository URL (optional)
   - `occasion`: Event name (optional)
   - `status`: completed/in-progress/planned

### Adding New Mentors

1. Go to **Table Editor > mentors**
2. Click **Insert > Insert row**
3. Fill in the required fields:
   - `id`: Unique login ID
   - `password`: Login password
   - `name`: Full name
   - `email`: Email address
   - `department`: Department name
   - `join_date`: Join date

### Bulk Data Import

You can also use Supabase's CSV import feature:

1. Go to **Table Editor**
2. Select your table
3. Click **Insert > Upload CSV**
4. Map your CSV columns to table columns

## 🎨 Features

### Dynamic Data Loading
- All project data is fetched from Supabase
- Loading states and error handling
- Real-time data updates

### Admin Portal
- Secure mentor authentication
- Mentor-specific project views
- Dashboard with statistics

### Responsive Design
- Mobile-friendly interface
- Smooth animations with Framer Motion
- Dark/light theme support

## 🔄 Future Enhancements

- Real-time updates using Supabase subscriptions
- File upload for project images
- Teams management system
- Advanced filtering and search
- Email notifications
- Password hashing and proper authentication

## 📝 Notes

- The current implementation uses plaintext passwords for simplicity
- RLS policies are set to allow public read access for projects
- All data is stored in Supabase and can be easily managed through the dashboard