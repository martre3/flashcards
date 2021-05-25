import { User } from '../user';

export interface AuthResponse {
  jwt: string;
  user: User;
}
