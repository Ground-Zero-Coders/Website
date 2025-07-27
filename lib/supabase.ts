import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hceehmxkiwheaaceouvd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjZWVobXhraXdoZWFhY2VvdXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MjU2NzQsImV4cCI6MjA1MzQwMTY3NH0.qJGvJhkJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJG';

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

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

export interface Mentee {
  id: string;
  name: string;
  email: string;
  group_name?: string;
  mentor_id?: string;
  mentor_name?: string;
  domain?: string;
  github_id?: string;
  join_date: string;
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

export const menteeService = {
  async getAll(): Promise<Mentee[]> {
    const { data, error } = await supabase
      .from('mentees')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching mentees:', error);
      return [];
    }

    return data || [];
  },

  async getByMentorId(mentorId: string): Promise<Mentee[]> {
    const { data, error } = await supabase
      .from('mentees')
      .select('*')
      .eq('mentor_id', mentorId)
      .order('name');

    if (error) {
      console.error('Error fetching mentees by mentor:', error);
      return [];
    }

    return data || [];
  },

  async create(mentee: Omit<Mentee, 'id' | 'created_at'>): Promise<Mentee | null> {
    const { data, error } = await supabase
      .from('mentees')
      .insert([mentee])
      .select()
      .single();

    if (error) {
      console.error('Error creating mentee:', error);
      return null;
    }

    return data;
  },

  async update(id: string, updates: Partial<Mentee>): Promise<Mentee | null> {
    const { data, error } = await supabase
      .from('mentees')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating mentee:', error);
      return null;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('mentees')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting mentee:', error);
      return false;
    }

    return true;
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