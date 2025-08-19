import { Module } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { VerifyController } from './verify.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtTempModule } from 'src/jwt/jwt-temp.module';

@Module({
  imports: [UsersModule, JwtTempModule],
  controllers: [VerifyController],
  providers: [VerifyService],
})
export class VerifyModule {}
