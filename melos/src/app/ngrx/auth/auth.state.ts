import { AuthModel } from '../../models/auth.model';

export interface AuthState {
  authData: AuthModel | null;
  auth: any;
  isLogging: boolean;
  loggingSuccess: boolean;
  error: any;
}
