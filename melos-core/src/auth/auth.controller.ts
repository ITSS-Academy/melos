import { Controller, Get, Headers, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async verifyToken(@Headers('authorization') idToken: string) {
    const user = await this.authService.verifyToken(idToken);
    return user;
  }

  @Get('user-id')
  async getUserByUid(@Request() req: any) {
    try {
      const { uid } = req.query;
      return await this.authService.getUserId(uid);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
