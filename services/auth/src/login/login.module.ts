import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtConfigModule } from 'src/jwt/jwt.module';

@Module({
  imports: [UsersModule, JwtConfigModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
