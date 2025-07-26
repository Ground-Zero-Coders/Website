export interface Mentee {
  id: string;
  name: string;
  githubId: string;
  email: string;
  domain: string;
  joinDate: string;
  teamNumber: number;
}

export interface MentorTeam {
  mentorId: string;
  mentorName: string;
  teams: {
    teamNumber: number;
    teamName: string;
    mentees: Mentee[];
  }[];
}

export const mentorTeams: MentorTeam[] = [
  {
    mentorId: 'mentor-001',
    mentorName: 'Dr. Sarah Johnson',
    teams: [
      {
        teamNumber: 1,
        teamName: 'Web Warriors',
        mentees: [
          {
            id: 'mentee-001',
            name: 'Alex Chen',
            githubId: 'alexchen-dev',
            email: 'alex.chen@student.org',
            domain: 'Frontend Development',
            joinDate: '2024-01-10',
            teamNumber: 1
          },
          {
            id: 'mentee-002',
            name: 'Maria Rodriguez',
            githubId: 'maria-rodriguez',
            email: 'maria.rodriguez@student.org',
            domain: 'Backend Development',
            joinDate: '2024-01-10',
            teamNumber: 1
          },
          {
            id: 'mentee-016',
            name: 'Sam Wilson',
            githubId: 'samwilson-web',
            email: 'sam.wilson@student.org',
            domain: 'Full Stack',
            joinDate: '2024-01-12',
            teamNumber: 1
          },
          {
            id: 'mentee-017',
            name: 'Nina Patel',
            githubId: 'nina-patel',
            email: 'nina.patel@student.org',
            domain: 'UI/UX',
            joinDate: '2024-01-12',
            teamNumber: 1
          }
        ]
      },
      {
        teamNumber: 2,
        teamName: 'Code Crusaders',
        mentees: [
          {
            id: 'mentee-018',
            name: 'Jake Thompson',
            githubId: 'jake-thompson',
            email: 'jake.thompson@student.org',
            domain: 'React Development',
            joinDate: '2024-01-15',
            teamNumber: 2
          },
          {
            id: 'mentee-019',
            name: 'Zoe Martinez',
            githubId: 'zoe-martinez',
            email: 'zoe.martinez@student.org',
            domain: 'Node.js',
            joinDate: '2024-01-15',
            teamNumber: 2
          },
          {
            id: 'mentee-020',
            name: 'Ryan Cooper',
            githubId: 'ryan-cooper',
            email: 'ryan.cooper@student.org',
            domain: 'Database Design',
            joinDate: '2024-01-16',
            teamNumber: 2
          },
          {
            id: 'mentee-021',
            name: 'Lily Zhang',
            githubId: 'lily-zhang',
            email: 'lily.zhang@student.org',
            domain: 'DevOps',
            joinDate: '2024-01-16',
            teamNumber: 2
          }
        ]
      },
      {
        teamNumber: 3,
        teamName: 'Digital Dynamos',
        mentees: [
          {
            id: 'mentee-022',
            name: 'Max Johnson',
            githubId: 'max-johnson',
            email: 'max.johnson@student.org',
            domain: 'Vue.js',
            joinDate: '2024-01-18',
            teamNumber: 3
          },
          {
            id: 'mentee-023',
            name: 'Aria Kim',
            githubId: 'aria-kim',
            email: 'aria.kim@student.org',
            domain: 'Angular',
            joinDate: '2024-01-18',
            teamNumber: 3
          },
          {
            id: 'mentee-024',
            name: 'Leo Brown',
            githubId: 'leo-brown',
            email: 'leo.brown@student.org',
            domain: 'Python Backend',
            joinDate: '2024-01-19',
            teamNumber: 3
          },
          {
            id: 'mentee-025',
            name: 'Maya Singh',
            githubId: 'maya-singh',
            email: 'maya.singh@student.org',
            domain: 'API Development',
            joinDate: '2024-01-19',
            teamNumber: 3
          }
        ]
      },
      {
        teamNumber: 4,
        teamName: 'Tech Titans',
        mentees: [
          {
            id: 'mentee-026',
            name: 'Ethan Davis',
            githubId: 'ethan-davis',
            email: 'ethan.davis@student.org',
            domain: 'GraphQL',
            joinDate: '2024-01-20',
            teamNumber: 4
          },
          {
            id: 'mentee-027',
            name: 'Chloe Wilson',
            githubId: 'chloe-wilson',
            email: 'chloe.wilson@student.org',
            domain: 'TypeScript',
            joinDate: '2024-01-20',
            teamNumber: 4
          },
          {
            id: 'mentee-028',
            name: 'Noah Garcia',
            githubId: 'noah-garcia',
            email: 'noah.garcia@student.org',
            domain: 'Microservices',
            joinDate: '2024-01-21',
            teamNumber: 4
          },
          {
            id: 'mentee-029',
            name: 'Sophia Lee',
            githubId: 'sophia-lee',
            email: 'sophia.lee@student.org',
            domain: 'Cloud Computing',
            joinDate: '2024-01-21',
            teamNumber: 4
          }
        ]
      }
    ]
  },
  {
    mentorId: 'mentor-002',
    mentorName: 'Prof. Mike Davis',
    teams: [
      {
        teamNumber: 1,
        teamName: 'AI Pioneers',
        mentees: [
          {
            id: 'mentee-003',
            name: 'Kevin Park',
            githubId: 'kevinpark-ai',
            email: 'kevin.park@student.org',
            domain: 'Machine Learning',
            joinDate: '2024-01-10',
            teamNumber: 1
          },
          {
            id: 'mentee-004',
            name: 'Lisa Wang',
            githubId: 'lisa-wang-ai',
            email: 'lisa.wang@student.org',
            domain: 'Deep Learning',
            joinDate: '2024-01-10',
            teamNumber: 1
          },
          {
            id: 'mentee-030',
            name: 'Oliver Chen',
            githubId: 'oliver-chen',
            email: 'oliver.chen@student.org',
            domain: 'Computer Vision',
            joinDate: '2024-01-12',
            teamNumber: 1
          },
          {
            id: 'mentee-031',
            name: 'Emma Taylor',
            githubId: 'emma-taylor',
            email: 'emma.taylor@student.org',
            domain: 'NLP',
            joinDate: '2024-01-12',
            teamNumber: 1
          }
        ]
      },
      {
        teamNumber: 2,
        teamName: 'ML Masters',
        mentees: [
          {
            id: 'mentee-032',
            name: 'Liam Anderson',
            githubId: 'liam-anderson',
            email: 'liam.anderson@student.org',
            domain: 'Neural Networks',
            joinDate: '2024-01-15',
            teamNumber: 2
          },
          {
            id: 'mentee-033',
            name: 'Ava Martinez',
            githubId: 'ava-martinez',
            email: 'ava.martinez@student.org',
            domain: 'Data Mining',
            joinDate: '2024-01-15',
            teamNumber: 2
          },
          {
            id: 'mentee-034',
            name: 'Mason White',
            githubId: 'mason-white',
            email: 'mason.white@student.org',
            domain: 'Reinforcement Learning',
            joinDate: '2024-01-16',
            teamNumber: 2
          },
          {
            id: 'mentee-035',
            name: 'Isabella Clark',
            githubId: 'isabella-clark',
            email: 'isabella.clark@student.org',
            domain: 'AI Ethics',
            joinDate: '2024-01-16',
            teamNumber: 2
          }
        ]
      },
      {
        teamNumber: 3,
        teamName: 'Data Wizards',
        mentees: [
          {
            id: 'mentee-036',
            name: 'Lucas Rodriguez',
            githubId: 'lucas-rodriguez',
            email: 'lucas.rodriguez@student.org',
            domain: 'TensorFlow',
            joinDate: '2024-01-18',
            teamNumber: 3
          },
          {
            id: 'mentee-037',
            name: 'Mia Thompson',
            githubId: 'mia-thompson',
            email: 'mia.thompson@student.org',
            domain: 'PyTorch',
            joinDate: '2024-01-18',
            teamNumber: 3
          },
          {
            id: 'mentee-038',
            name: 'Alexander Lee',
            githubId: 'alexander-lee',
            email: 'alexander.lee@student.org',
            domain: 'Scikit-learn',
            joinDate: '2024-01-19',
            teamNumber: 3
          },
          {
            id: 'mentee-039',
            name: 'Charlotte Wilson',
            githubId: 'charlotte-wilson',
            email: 'charlotte.wilson@student.org',
            domain: 'Statistical Analysis',
            joinDate: '2024-01-19',
            teamNumber: 3
          }
        ]
      },
      {
        teamNumber: 4,
        teamName: 'Neural Network Ninjas',
        mentees: [
          {
            id: 'mentee-040',
            name: 'Benjamin Garcia',
            githubId: 'benjamin-garcia',
            email: 'benjamin.garcia@student.org',
            domain: 'CNN',
            joinDate: '2024-01-20',
            teamNumber: 4
          },
          {
            id: 'mentee-041',
            name: 'Amelia Davis',
            githubId: 'amelia-davis',
            email: 'amelia.davis@student.org',
            domain: 'RNN',
            joinDate: '2024-01-20',
            teamNumber: 4
          },
          {
            id: 'mentee-042',
            name: 'Henry Martinez',
            githubId: 'henry-martinez',
            email: 'henry.martinez@student.org',
            domain: 'GAN',
            joinDate: '2024-01-21',
            teamNumber: 4
          },
          {
            id: 'mentee-043',
            name: 'Harper Brown',
            githubId: 'harper-brown',
            email: 'harper.brown@student.org',
            domain: 'Transformer Models',
            joinDate: '2024-01-21',
            teamNumber: 4
          }
        ]
      }
    ]
  }
];