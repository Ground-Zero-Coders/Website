export interface Update {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'announcement' | 'workshop';
  description: string;
  participants?: string[];
  location?: string;
  priority: 'high' | 'medium' | 'low';
}

export const updates: Update[] = [
  {
    id: 'update-001',
    title: 'Weekly Mentor-Core Team Sync',
    date: '2024-02-28',
    time: '10:00 AM',
    type: 'meeting',
    description: 'Regular sync meeting to discuss mentee progress and upcoming projects',
    participants: ['Core Team', 'All Mentors'],
    location: 'Conference Room A',
    priority: 'high'
  },
  {
    id: 'update-002',
    title: 'Project Submission Deadline',
    date: '2024-03-05',
    time: '11:59 PM',
    type: 'deadline',
    description: 'Final submission deadline for Q1 2024 projects',
    priority: 'high'
  },
  {
    id: 'update-003',
    title: 'AI Workshop Planning',
    date: '2024-03-01',
    time: '2:00 PM',
    type: 'meeting',
    description: 'Planning session for the upcoming AI/ML workshop series',
    participants: ['AI Mentors', 'Tech Head'],
    location: 'Virtual Meeting',
    priority: 'medium'
  },
  {
    id: 'update-004',
    title: 'New Mentee Orientation',
    date: '2024-03-08',
    time: '9:00 AM',
    type: 'workshop',
    description: 'Orientation session for new mentees joining the program',
    participants: ['New Mentees', 'Assigned Mentors'],
    location: 'Main Auditorium',
    priority: 'medium'
  },
  {
    id: 'update-005',
    title: 'Quarterly Review Preparation',
    date: '2024-03-12',
    time: '3:00 PM',
    type: 'meeting',
    description: 'Preparation meeting for Q1 2024 quarterly review presentations',
    participants: ['All Mentors'],
    location: 'Conference Room B',
    priority: 'high'
  },
  {
    id: 'update-006',
    title: 'Tech Stack Update Announcement',
    date: '2024-02-25',
    time: '12:00 PM',
    type: 'announcement',
    description: 'Important updates regarding approved tech stacks for new projects',
    priority: 'medium'
  },
  {
    id: 'update-007',
    title: 'Hackathon 2024 Planning',
    date: '2024-03-15',
    time: '4:00 PM',
    type: 'meeting',
    description: 'Strategic planning meeting for the annual hackathon event',
    participants: ['Event Committee', 'Mentors'],
    location: 'Innovation Lab',
    priority: 'high'
  },
  {
    id: 'update-008',
    title: 'Mentorship Guidelines Review',
    date: '2024-03-03',
    time: '1:00 PM',
    type: 'workshop',
    description: 'Review and update of mentorship guidelines and best practices',
    participants: ['All Mentors'],
    location: 'Training Room',
    priority: 'low'
  }
];