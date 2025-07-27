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
    image: 'Shivansh.jpg',
  },
  {
    id: 'ct-002',
    name: 'Sankalp Shukla',
    position: 'Vice President',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
   },
  {
    id: 'ct-003',
    name: 'Aryan Tripathi',
    position: 'Tech cse Head',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
   },
  {
    id: 'ct-004',
    name: 'Akshansh Kumar',
    position: 'Tech ECE Head',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  },
  {
    id: 'ct-005',
    name: 'Shreya Gupta',
    position: 'Management Head',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
   },
   {
    id: 'ct-006',
    name: 'Arein Jain',
    position: 'PR & Marketing',
    image: 'https://images.pexels.com/photos/1181693/pexels-photo-1181693.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  },
  {
    id: 'ct-006',
    name: 'Aarav Jai',
    position: 'Design Head',
    image: 'https://images.pexels.com/photos/1181693/pexels-photo-1181693.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    },
   {
    id: 'ct-006',
    name: 'Paridhi Jain',
    position: '128 Head',
    image: 'https://images.pexels.com/photos/1181693/pexels-photo-1181693.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  },
  
];
