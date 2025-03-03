import { AuthModel } from '../../models/auth.model';

export interface AuthState {
  authData: AuthModel | null;
  auth: any;
  isLogging: boolean;
  error: any;
}
