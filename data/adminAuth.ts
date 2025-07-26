export interface AdminCredentials {
  adminId: string;
  password: string;
  name: string;
  email: string;
  role: string;
}

export const adminCredentials: AdminCredentials[] = [
  {
    adminId: 'admin-001',
    password: 'admin2024',
    name: 'System Administrator',
    email: 'admin@groundzerocoders.org',
    role: 'super_admin'
  },
  {
    adminId: 'admin-002',
    password: 'gzc2024',
    name: 'Tech Admin',
    email: 'tech.admin@groundzerocoders.org',
    role: 'admin'
  },
  {
    adminId: 'mentor-001',
    password: 'sarah2024',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@groundzerocoders.org',
    role: 'admin'
  }
];

export const authenticateAdmin = (adminId: string, password: string): AdminCredentials | null => {
  const admin = adminCredentials.find(
    cred => cred.adminId === adminId && cred.password === password
  );
  return admin || null;
};