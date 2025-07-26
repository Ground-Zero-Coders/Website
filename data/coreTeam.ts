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
    name: 'Alex Johnson',
    position: 'President',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'alex.johnson@groundzerocoders.org',
    linkedin: 'https://linkedin.com/in/alexjohnson'
  },
  {
    id: 'ct-002',
    name: 'Sarah Chen',
    position: 'Vice President',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'sarah.chen@groundzerocoders.org',
    linkedin: 'https://linkedin.com/in/sarahchen'
  },
  {
    id: 'ct-003',
    name: 'Mike Rodriguez',
    position: 'Tech Head',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'mike.rodriguez@groundzerocoders.org',
    linkedin: 'https://linkedin.com/in/mikerodriguez'
  },
  {
    id: 'ct-004',
    name: 'Emily Davis',
    position: 'PR Head',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'emily.davis@groundzerocoders.org',
    linkedin: 'https://linkedin.com/in/emilydavis'
  },
  {
    id: 'ct-005',
    name: 'David Kim',
    position: 'Management Head',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'david.kim@groundzerocoders.org',
    linkedin: 'https://linkedin.com/in/davidkim'
  },
  {
    id: 'ct-006',
    name: 'Lisa Wang',
    position: 'Design Head',
    image: 'https://images.pexels.com/photos/1181693/pexels-photo-1181693.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    email: 'lisa.wang@groundzerocoders.org',
    linkedin: 'https://linkedin.com/in/lisawang'
  },
];