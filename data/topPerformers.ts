export interface TopPerformer {
  id: string;
  name: string;
  group: string;
  domain: string;
  image: string;
  achievement: string;
  githubId: string;
}

export const topPerformers: TopPerformer[] = [
  {
    id: 'tp-001',
    name: 'James Wilson',
    group: 'GZ-1',
    domain: 'Full Stack Development',
    image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    achievement: 'Led 10+ successful projects',
    githubId: 'jameswilson-dev'
  },
  {
    id: 'tp-002',
    name: 'Maria Garcia',
    group: 'GZ-2',
    domain: 'UI/UX Design',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    achievement: 'Award-winning designer',
    githubId: 'mariagarcia-design'
  },
  {
    id: 'tp-003',
    name: 'Kevin Park',
    group: 'GZ-3',
    domain: 'Artificial Intelligence',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    achievement: 'AI research contributor',
    githubId: 'kevinpark-ai'
  },
];