export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'PDF' | 'Folder' | 'Spreadsheet' | 'Document' | 'Video' | 'Link';
  category: 'guidelines' | 'templates' | 'assessment' | 'tech-stack' | 'training' | 'tools';
  isExternal: boolean;
}

export const mentorResources: Resource[] = [
  {
    id: 'resource-001',
    title: 'Mentor Guidelines',
    description: 'Complete guide for effective mentoring and best practices',
    link: 'https://drive.google.com/file/d/1234567890/view',
    type: 'PDF',
    category: 'guidelines',
    isExternal: true
  },
  {
    id: 'resource-002',
    title: 'Project Templates',
    description: 'Starter templates for different project types and frameworks',
    link: 'https://drive.google.com/drive/folders/0987654321',
    type: 'Folder',
    category: 'templates',
    isExternal: true
  },
  {
    id: 'resource-003',
    title: 'Assessment Rubrics',
    description: 'Evaluation criteria and scoring guidelines for mentee projects',
    link: 'https://docs.google.com/spreadsheets/d/abcdef123456',
    type: 'Spreadsheet',
    category: 'assessment',
    isExternal: true
  },
  {
    id: 'resource-004',
    title: 'Tech Stack Resources',
    description: 'Approved technologies, frameworks, and learning resources',
    link: 'https://docs.google.com/document/d/tech-stack-guide',
    type: 'Document',
    category: 'tech-stack',
    isExternal: true
  },
  {
    id: 'resource-005',
    title: 'Mentoring Best Practices Video',
    description: 'Video series on effective mentoring techniques and communication',
    link: 'https://www.youtube.com/watch?v=mentoring-guide',
    type: 'Video',
    category: 'training',
    isExternal: true
  },
  {
    id: 'resource-006',
    title: 'Code Review Guidelines',
    description: 'Standards and practices for reviewing mentee code submissions',
    link: 'https://github.com/groundzerocoders/code-review-guide',
    type: 'Document',
    category: 'guidelines',
    isExternal: true
  },
  {
    id: 'resource-007',
    title: 'Project Management Tools',
    description: 'Recommended tools for tracking project progress and team collaboration',
    link: 'https://trello.com/b/project-management-template',
    type: 'Link',
    category: 'tools',
    isExternal: true
  },
  {
    id: 'resource-008',
    title: 'Weekly Report Template',
    description: 'Template for structured weekly progress reports and feedback',
    link: 'https://docs.google.com/document/d/weekly-report-template',
    type: 'Document',
    category: 'templates',
    isExternal: true
  }
];

export const getResourcesByCategory = (category: Resource['category']): Resource[] => {
  return mentorResources.filter(resource => resource.category === category);
};

export const getResourceById = (id: string): Resource | undefined => {
  return mentorResources.find(resource => resource.id === id);
};