export interface CoreTeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  email?: string;
  linkedin?: string;
}

export const coreTeam: CoreTeamMember[] = [
  {
    id: 'ct-001',
    name: 'Shivansh Saxena',
    position: 'President',
    image: '/shivansh.jpg',
  },
  {
    id: 'ct-002',
    name: 'Sankalp Shukla',
    position: 'Vice President',
    image: '/sankalp2.jpg',
   },
  {
    id: 'ct-003',
    name: 'Aryan Tripathi',
    position: 'Tech CSE Head',
    image: '/aryan.jpg',
   },
  {
    id: 'ct-004',
    name: 'Akshansh Kumar',
    position: 'Tech ECE Head',
    image: '/akshansh.jpg',
  },
  {
    id: 'ct-005',
    name: 'Shreya Gupta',
    position: 'Management Head',
    image: '/shreya.jpg',
   },
   {
    id: 'ct-006',
    name: 'Arein Jain',
    position: 'PR & Marketing Head',
    image: '/arein.jpg',
  },
  {
    id: 'ct-006',
    name: 'Aarav Jai',
    position:'Design & Creative Head',
    image: '/aarav.jpg',
    },
   {
    id: 'ct-006',
    name: 'Paridhi Jain',
    position: '128 Head',
    image: '/paridhi.jpg',
  },
  
];
