import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async verifyToken(@Headers('authorization') idToken: string) {
    const user = await this.authService.verifyToken(idToken);
    console.log(user);
    return user;
  }
}
