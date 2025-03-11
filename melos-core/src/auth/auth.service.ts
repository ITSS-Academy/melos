import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  async verifyToken(idToken: string): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, email, name, picture } = decodedToken;

      const { data, error, count } = await this.supabaseProvider
        .getClient()
        .from('auth')
        .select('*', { count: 'exact' })
        .eq('uid', decodedToken.uid);

      if (error) {
        throw new Error(error.message);
      }

      if (count === 0) {
        const { data, error } = await this.supabaseProvider
          .getClient()
          .from('auth')
          .insert([{ uid, email, name, picture }]);

        if (error) {
          throw new HttpException(error.message, 400);
        }

        const { data: user, error: userError } = await this.supabaseProvider
          .getClient()
          .from('auth')
          .select('*')
          .eq('uid', decodedToken.uid);

        if (userError) {
          throw new HttpException(userError.message, 400);
        }

        return user[0];
      } else if (count > 1) {
        throw new Error('Multiple rows returned for a single user');
      }

      return data[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserId(uid: string) {
    const { data, error, count } = await this.supabaseProvider
      .getClient()
      .from('auth')
      .select('*', { count: 'exact' })
      .eq('uid', uid);

    if (error) {
      throw new Error(error.message);
    }

    if (count === 0) {
      throw new UnauthorizedException('User not found');
    } else if (count > 1) {
      throw new Error('Multiple rows returned for a single user');
    }

    return data[0];
  }
}
