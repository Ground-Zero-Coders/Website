export interface AdminCredentials {
  adminId: string;
  password: string;
  name: string;
  email: string;
  role: string;
}

export const adminCredentials: AdminCredentials[] = [
  {
    adminId: 'admin1',
    password: 'admin1',
    name: 'test',
    email: 'test',
    role: 'test_admin'
  },
  {
    adminId: 'admin2',
    password: 'admin2',
    name: 'test',
    email: 'tech.admin@groundzerocoders.org',
    role: 'tester'
  },
  {
    adminId: 'Harsimran7765',
    password: 'Hr626264',
    name: 'Harsimran Singh',
    email: 'HarsimranSingh7765@gmail.com',
    role: 'admin'
  }
];

export const authenticateAdmin = (adminId: string, password: string): AdminCredentials | null => {
  const admin = adminCredentials.find(
    cred => cred.adminId === adminId && cred.password === password
  );
  return admin || null;
};