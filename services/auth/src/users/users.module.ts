import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { UserApiService } from 'src/common/api/users';

@Module({
  imports: [HttpModule],
  providers: [UsersService, UserApiService],
  exports: [UsersService],
})
export class UsersModule {}
