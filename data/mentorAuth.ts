export interface MentorCredentials {
  mentorId: string;
  password: string;
  name: string;
  email: string;
  department: string;
  joinDate: string;
}

export const mentorCredentials: MentorCredentials[] = [
  {
    mentorId: 'mentor-001',
    password: 'sarah2024',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@groundzerocoders.org',
    department: 'Web Development',
    joinDate: '2023-08-15'
  },
  {
    mentorId: 'mentor-002',
    password: 'mike2024',
    name: 'Prof. Mike Davis',
    email: 'mike.davis@groundzerocoders.org',
    department: 'Artificial Intelligence',
    joinDate: '2023-09-01'
  },
  {
    mentorId: 'mentor-003',
    password: 'emily2024',
    name: 'Emily Zhang',
    email: 'emily.zhang@groundzerocoders.org',
    department: 'Mobile Development',
    joinDate: '2023-09-15'
  },
  {
    mentorId: 'mentor-004',
    password: 'james2024',
    name: 'James Wilson',
    email: 'james.wilson@groundzerocoders.org',
    department: 'Blockchain',
    joinDate: '2023-10-01'
  },
  {
    mentorId: 'mentor-005',
    password: 'rachel2024',
    name: 'Dr. Rachel Green',
    email: 'rachel.green@groundzerocoders.org',
    department: 'Data Science',
    joinDate: '2023-10-15'
  },
];