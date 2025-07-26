export interface Project {
  id: string;
  title: string;
  image: string;
  occasion: string;
  date: string;
  mentor: string;
  mentorId: string;
  mentees: string[];
  menteeIds: string[];
  description: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  githubRepo?: string;
  liveDemo?: string;
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    title: 'E-Commerce Platform',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    occasion: 'Hackathon 2024',
    date: '2024-01-15',
    mentor: 'Dr. Sarah Johnson',
    mentorId: 'mentor-001',
    mentees: ['Alex Chen', 'Maria Rodriguez'],
    menteeIds: ['mentee-001', 'mentee-002'],
    description: 'Full-stack e-commerce solution with modern UI/UX and payment integration',
    category: 'Web Development',
    status: 'completed',
    githubRepo: 'https://github.com/groundzerocoders/ecommerce-platform',
    liveDemo: 'https://ecommerce-demo.groundzerocoders.org'
  },
  {
    id: 'proj-002',
    title: 'AI-Powered Chatbot',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    occasion: 'AI Workshop',
    date: '2024-01-20',
    mentor: 'Prof. Mike Davis',
    mentorId: 'mentor-002',
    mentees: ['Kevin Park', 'Lisa Wang'],
    menteeIds: ['mentee-003', 'mentee-004'],
    description: 'Natural language processing chatbot with ML capabilities and voice integration',
    category: 'Artificial Intelligence',
    status: 'completed',
    githubRepo: 'https://github.com/groundzerocoders/ai-chatbot'
  },
  {
    id: 'proj-003',
    title: 'Mobile Fitness App',
    image: 'https://images.pexels.com/photos/4156467/pexels-photo-4156467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    occasion: 'Mobile Dev Challenge',
    date: '2024-02-01',
    mentor: 'Emily Zhang',
    mentorId: 'mentor-003',
    mentees: ['David Kim'],
    menteeIds: ['mentee-005'],
    description: 'Cross-platform fitness tracking with social features and gamification',
    category: 'Mobile Development',
    status: 'in-progress'
  },
  {
    id: 'proj-004',
    title: 'Blockchain Voting System',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    occasion: 'Blockchain Summit',
    date: '2024-02-10',
    mentor: 'James Wilson',
    mentorId: 'mentor-004',
    mentees: ['Anna Taylor', 'Tom Brown'],
    menteeIds: ['mentee-006', 'mentee-007'],
    description: 'Secure and transparent voting system using blockchain technology',
    category: 'Blockchain',
    status: 'completed'
  },
  {
    id: 'proj-005',
    title: 'Weather Prediction ML Model',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    occasion: 'Data Science Workshop',
    date: '2024-02-15',
    mentor: 'Dr. Rachel Green',
    mentorId: 'mentor-005',
    mentees: ['Sophie Miller', 'John Davis'],
    menteeIds: ['mentee-008', 'mentee-009'],
    description: 'Machine learning model for accurate weather prediction using historical data',
    category: 'Data Science',
    status: 'in-progress'
  },
  {
    id: 'proj-006',
    title: 'Smart Home IoT System',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    occasion: 'IoT Hackathon',
    date: '2024-02-20',
    mentor: 'Mark Thompson',
    mentorId: 'mentor-006',
    mentees: ['Claire Wilson', 'Ryan Lee'],
    menteeIds: ['mentee-010', 'mentee-011'],
    description: 'IoT-based smart home automation system with mobile app control',
    category: 'IoT',
    status: 'planned'
  },
  {
    id: 'proj-007',
    title: 'Social Media Analytics Dashboard',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    occasion: 'Analytics Challenge',
    date: '2024-02-25',
    mentor: 'Jessica Roberts',
    mentorId: 'mentor-007',
    mentees: ['Michael Chang', 'Olivia Smith'],
    menteeIds: ['mentee-012', 'mentee-013'],
    description: 'Real-time social media analytics dashboard with sentiment analysis',
    category: 'Data Visualization',
    status: 'in-progress'
  },
  {
    id: 'proj-008',
    title: 'AR Shopping Experience',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    occasion: 'AR/VR Workshop',
    date: '2024-03-01',
    mentor: 'Alex Johnson',
    mentorId: 'mentor-008',
    mentees: ['Emma Garcia', 'Lucas Martinez'],
    menteeIds: ['mentee-014', 'mentee-015'],
    description: 'Augmented reality shopping experience for virtual product try-ons',
    category: 'AR/VR',
    status: 'planned'
  },
];