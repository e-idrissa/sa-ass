// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { UserApiService } from 'src/common/api/users';
import { UserResponseDto } from 'src/common/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userApiService: UserApiService) {}

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    return this.userApiService.findUserByEmail(email);
  }
}
