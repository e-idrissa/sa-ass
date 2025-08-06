import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { VerifyModule } from './verify/verify.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [LoginModule, LogoutModule, VerifyModule, PasswordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
