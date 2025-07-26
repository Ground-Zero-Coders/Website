import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Admin {
  id: string;
  password: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  mentor_id: string;
  mentor_name: string;
  message: string;
  week_of: string;
  created_at: string;
}

export interface Mentor {
  id: string;
  password: string;
  name: string;
  email: string;
  department: string;
  join_date: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  github?: string;
  mentee: string;
  mentor: string;
  mentor_id: string;
  date: string;
  group: string;
  description?: string;
  image?: string;
  occasion?: string;
  status: string;
  created_at: string;
}

// Database functions
export const mentorService = {
  async authenticate(mentorId: string, password: string): Promise<Mentor | null> {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('id', mentorId)
      .eq('password', password)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  },

  async getAll(): Promise<Mentor[]> {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching mentors:', error);
      return [];
    }

    return data || [];
  },

  async getById(id: string): Promise<Mentor | null> {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  }
};

export const projectService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  },

  async getByMentorId(mentorId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .or(`mentor_id.eq.${mentorId},mentor.ilike.%${mentorId}%`)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching mentor projects:', error);
      return [];
    }

    return data || [];
  },

  async getByMentorName(mentorName: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .or(`mentor_id.eq.${mentorName},mentor.ilike.%${mentorName}%`)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching mentor projects by name:', error);
      return [];
    }

    return data || [];
  },

  async create(project: Omit<Project, 'id' | 'created_at'>): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }

    return data;
  },

  async getFeatured(limit: number = 4): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }

    return data || [];
  }
};

export const adminService = {
  async authenticate(adminId: string, password: string): Promise<Admin | null> {
    // For now, use hardcoded admin credentials
    if (adminId === 'admin-001' && password === 'admin2024') {
      return {
        id: 'admin-001',
        password: 'admin2024',
        name: 'System Administrator',
        email: 'admin@groundzerocoders.org',
        role: 'admin',
        created_at: new Date().toISOString()
      };
    }
    return null;
  }
};

export const feedbackService = {
  async getAll(): Promise<Feedback[]> {
    // For now, return mock data since we don't have feedback table yet
    return [
      {
        id: 'feedback-001',
        mentor_id: 'mentor-001',
        mentor_name: 'Dr. Sarah Johnson',
        message: 'Team is making excellent progress on the e-commerce project. All milestones are on track.',
        week_of: '2024-01-15',
        created_at: '2024-01-15T10:00:00Z'
      },
      {
        id: 'feedback-002',
        mentor_id: 'mentor-002',
        mentor_name: 'Prof. Mike Davis',
        message: 'AI chatbot project is challenging but the team is learning a lot. Need more time for ML model training.',
        week_of: '2024-01-20',
        created_at: '2024-01-20T14:30:00Z'
      }
    ];
  },

  async create(feedback: Omit<Feedback, 'id' | 'created_at'>): Promise<Feedback | null> {
    // For now, just return the feedback with generated ID
    return {
      ...feedback,
      id: `feedback-${Date.now()}`,
      created_at: new Date().toISOString()
    };
  }
};