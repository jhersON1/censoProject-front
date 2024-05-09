export interface User {
  id: string;
  name: string;
  email: string;
  lastname: string;
  dni: string;
  isActive: boolean;
  newUser: boolean;
  roles: string[];
  adminCode: string;
}
