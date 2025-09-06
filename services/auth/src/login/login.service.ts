import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from 'src/common/dto/credentials.dto';
import { UserResponseDto } from 'src/common/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from './common/utils/bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credentials: CredentialsDto): Promise<UserResponseDto> {
    const res = await this.usersService.findOneByEmail(credentials.email);
    return res;
  }

  async authenticateUser(credentials: CredentialsDto) {
    const res = await this.validateUser(credentials);
    if (res.code === 404) {
      return {
        code: 404,
        message: 'User not found',
        result: null,
      };
    }

    const isPasswordValid = await comparePassword(
      credentials.passwordHash,
      res.result?.passwordHash,
    );
    if (!isPasswordValid) {
      return {
        code: 401,
        message: 'Invalid password',
        result: null,
      };
    }

    // Generate JWT payload
    const payload = {
      sub: res.result?.sub,
      email: res.result?.email,
      role: res.result?.role,
    };

    // Generate JWT token
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      code: 200,
      message: 'User authenticated successfully',
      result: {
        sub: res.result?.sub,
        role: res.result?.role,
        email: res.result?.email,
        accessToken,
        type: 'auth',
      },
    };
  }
}
