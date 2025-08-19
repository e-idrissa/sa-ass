// src/users/services/user-api.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { UserResponseDto } from '../dto/users.dto';

@Injectable()
export class UserApiService {
  private readonly usersApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.usersApiUrl = this.configService.get<string>(
      'USERS_SERVICE_URL',
    ) as string;
  }

  async findUserByEmail(email: string): Promise<UserResponseDto> {
    console.log('findUserByEmail called with:', email);
    const response = await firstValueFrom(
      this.httpService.get(`${this.usersApiUrl}/users/email/${email}`),
    );

    console.log('findUserByEmail response:', response.data);

    return response.data as UserResponseDto;
  }
}
