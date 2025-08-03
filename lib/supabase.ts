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
  week_of: string;
  team_progress: string;
  challenges?: string;
  achievements?: string;
  next_week_plans?: string;
  additional_notes?: string;
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

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: string;
  link: string;
  status: string;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  type: string;
  category: string;
  is_external: boolean;
  created_at: string;
}

export interface Achiever {
  id: string;
  event_name: string;
  winner_name: string;
  winner_photo?: string;
  position: number;
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
      .select(`
        *,
        mentor:mentors(name)
      `)
      .order('name');

    if (error) {
      console.error('Error fetching mentees:', error);
      return [];
    }

    // Transform the data to include mentor_name
    return (data || []).map(mentee => ({
      ...mentee,
      mentor_name: mentee.mentor?.name || null
    }));
  },

  async getByMentorId(mentorId: string): Promise<Mentee[]> {
    const { data, error } = await supabase
      .from('mentees')
      .select(`
        *,
        mentor:mentors(name)
      `)
      .eq('mentor_id', mentorId)
      .order('name');

    if (error) {
      console.error('Error fetching mentees by mentor:', error);
      return [];
    }

    // Transform the data to include mentor_name
    return (data || []).map(mentee => ({
      ...mentee,
      mentor_name: mentee.mentor?.name || null
    }));
  },

  async create(mentee: Omit<Mentee, 'id' | 'created_at'>): Promise<Mentee | null> {
    // Remove mentor_name from the data being inserted since it's not a real column
    const { mentor_name, ...menteeData } = mentee as any;
    
    const { data, error } = await supabase
      .from('mentees')
      .insert([menteeData])
      .select(`
        *,
        mentor:mentors(name)
      `)
      .single();

    if (error) {
      console.error('Error creating mentee:', error);
      return null;
    }

    // Transform the data to include mentor_name
    return {
      ...data,
      mentor_name: data.mentor?.name || null
    };
  },

  async update(id: string, updates: Partial<Mentee>): Promise<Mentee | null> {
    // Remove mentor_name from the updates since it's not a real column
    const { mentor_name, ...updateData } = updates as any;
    
    const { data, error } = await supabase
      .from('mentees')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        mentor:mentors(name)
      `)
      .single();

    if (error) {
      console.error('Error updating mentee:', error);
      return null;
    }

    // Transform the data to include mentor_name
    return {
      ...data,
      mentor_name: data.mentor?.name || null
    };
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
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', adminId)
      .eq('password', password)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  },

  async getAll(): Promise<Admin[]> {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching admins:', error);
      return [];
    }

    return data || [];
  },

  async getById(id: string): Promise<Admin | null> {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  }
};

export const feedbackService = {
  async getAll(): Promise<Feedback[]> {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching feedback:', error);
      return [];
    }

    return data || [];
  },

  async create(feedback: Omit<Feedback, 'id' | 'created_at'>): Promise<Feedback | null> {
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedback])
      .select()
      .single();

    if (error) {
      console.error('Error creating feedback:', error);
      return null;
    }

    return data;
  }
};

export const eventService = {
  async getAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    return data || [];
  },

  async getUpcoming(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'upcoming')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }

    return data || [];
  },

  async create(event: Omit<Event, 'id' | 'created_at'>): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      return null;
    }

    return data;
  },

  async update(id: string, updates: Partial<Event>): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      return null;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return false;
    }

    return true;
  }
};

export const resourceService = {
  async getAll(): Promise<Resource[]> {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching resources:', error);
      return [];
    }

    return data || [];
  },

  async getByCategory(category: string): Promise<Resource[]> {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('category', category)
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching resources by category:', error);
      return [];
    }

    return data || [];
  },

  async create(resource: Omit<Resource, 'id' | 'created_at'>): Promise<Resource | null> {
    const { data, error } = await supabase
      .from('resources')
      .insert([resource])
      .select()
      .single();

    if (error) {
      console.error('Error creating resource:', error);
      return null;
    }

    return data;
  },

  async update(id: string, updates: Partial<Resource>): Promise<Resource | null> {
    const { data, error } = await supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating resource:', error);
      return null;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting resource:', error);
      return false;
    }

    return true;
  }
};

export const achieverService = {
  async getAll(): Promise<Achiever[]> {
    const { data, error } = await supabase
      .from('achievers')
      .select('*')
      .order('event_name', { ascending: true })
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching achievers:', error);
      return [];
    }

    return data || [];
  },

  async getUniqueEvents(): Promise<string[]> {
    const { data, error } = await supabase
      .from('achievers')
      .select('event_name')
      .order('event_name', { ascending: true });

    if (error) {
      console.error('Error fetching unique events:', error);
      return [];
    }

    const uniqueEvents = Array.from(new Set(data?.map(item => item.event_name) || []));

    return uniqueEvents;
  },

  async getByEvent(eventName: string): Promise<Achiever[]> {
    const { data, error } = await supabase
      .from('achievers')
      .select('*')
      .eq('event_name', eventName)
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching achievers by event:', error);
      return [];
    }

    return data || [];
  },

  async create(achiever: Omit<Achiever, 'id' | 'created_at'>): Promise<Achiever | null> {
    const { data, error } = await supabase
      .from('achievers')
      .insert([achiever])
      .select()
      .single();

    if (error) {
      console.error('Error creating achiever:', error);
      return null;
    }

    return data;
  },

  async update(id: string, updates: Partial<Achiever>): Promise<Achiever | null> {
    const { data, error } = await supabase
      .from('achievers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating achiever:', error);
      return null;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('achievers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting achiever:', error);
      return false;
    }

    return true;
  }
};