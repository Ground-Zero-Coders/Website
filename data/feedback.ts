export interface Feedback {
  id: string;
  mentorId: string;
  mentorName: string;
  weekOf: string;
  teamProgress: string;
  challenges: string;
  achievements: string;
  nextWeekPlans: string;
  additionalNotes: string;
  submittedAt: string;
}

export const feedbackData: Feedback[] = [
  {
    id: 'fb-001',
    mentorId: 'mentor-001',
    mentorName: 'Dr. Sarah Johnson',
    weekOf: '2024-01-15',
    teamProgress: 'Team is making excellent progress on the e-commerce project. All milestones are on track and the frontend is nearly complete.',
    challenges: 'Some challenges with payment gateway integration, but we are working through the documentation.',
    achievements: 'Successfully implemented user authentication and product catalog functionality.',
    nextWeekPlans: 'Focus on payment integration and testing. Plan to have a working demo by end of week.',
    additionalNotes: 'Team morale is high and everyone is contributing effectively.',
    submittedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'fb-002',
    mentorId: 'mentor-002',
    mentorName: 'Prof. Mike Davis',
    weekOf: '2024-01-20',
    teamProgress: 'AI chatbot project is challenging but the team is learning a lot. Model training is in progress.',
    challenges: 'Need more computational resources for training. Dataset preprocessing took longer than expected.',
    achievements: 'Successfully implemented natural language processing pipeline and basic conversation flow.',
    nextWeekPlans: 'Complete model training and integrate with voice recognition system.',
    additionalNotes: 'Considering cloud computing resources for better performance.',
    submittedAt: '2024-01-20T14:45:00Z'
  },
  {
    id: 'fb-003',
    mentorId: 'mentor-003',
    mentorName: 'Emily Zhang',
    weekOf: '2024-02-01',
    teamProgress: 'Mobile fitness app development is progressing well. UI/UX design is complete.',
    challenges: 'Cross-platform compatibility issues with certain device sensors.',
    achievements: 'Completed user interface design and basic fitness tracking functionality.',
    nextWeekPlans: 'Implement social features and gamification elements.',
    additionalNotes: 'Team is excited about the social aspects of the app.',
    submittedAt: '2024-02-01T09:15:00Z'
  }
];