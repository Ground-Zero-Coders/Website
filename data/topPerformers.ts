export interface TopPerformer {
  id: string;
  name: string;
  group: string;
  domain: string;
  image: string;
  achievement: string;

}

export const topPerformers: TopPerformer[] = [
  {
    id: 'tp-001',
    name: 'Harsimaran Singh',
    group: 'GZC',
    domain: 'Full Stack Development',
    image: '/harsimran.jpg',
    achievement: 'Led 10+ successful projects',
   
  },
  {
    id: 'tp-002',
    name: 'Aryan Tripathi',
    group: 'GZC',
    domain: 'AI/ML',
    image: '/aryan.jpg',
    achievement: 'Led 15+ successful projects ',
  
  },
  {
    id: 'tp-003',
    name: 'Utakarsh Shukla',
    group: 'GZC',
    domain: 'Cyber Security',
    image: '/utkarsh.jpg',
    achievement: 'Cyber Security Intern',
  
  },
];
