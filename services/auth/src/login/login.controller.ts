import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() credentials: { email: string; passwordHash: string }) {
    return this.loginService.authenticateUser(credentials);
  }
}
