import { User } from '../user';

export interface AuthResponse {
  user: User;
  jwt: string;
}
