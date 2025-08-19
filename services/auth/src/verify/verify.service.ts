import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { VerifyRequestDto, VerifyResponseDto } from 'src/common/dto/verify.dto';

@Injectable()
export class VerifyService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateVerificationLink(
    verifyRequest: VerifyRequestDto,
  ): Promise<VerifyResponseDto> {
    console.log('generateVerificationLink called with:', verifyRequest);

    // Check if user exists in the system
    const userResponse = await this.usersService.findOneByEmail(
      verifyRequest.email,
    );

    if (userResponse.code === 404) {
      return {
        code: 404,
        message: 'User not found',
        result: null,
      };
    }

    if (userResponse.code !== 200) {
      return {
        code: userResponse.code,
        message: userResponse.message,
        result: null,
      };
    }

    try {
      // Generate temporary JWT with email-only payload
      const payload = {
        email: verifyRequest.email,
      };

      const tempToken = await this.jwtService.signAsync(payload);

      // Get frontend route from environment
      const frontendRoute = this.configService.get<string>('FRONTEND_ROUTE');
      const verificationLink = `http://${frontendRoute}/verify?token=${tempToken}`;

      return {
        code: 200,
        message: 'Verification link generated successfully',
        result: {
          verificationLink,
        },
      };
    } catch (error) {
      console.error('Error generating verification link:', error);
      return {
        code: 500,
        message: 'Internal server error while generating verification link',
        result: null,
      };
    }
  }
}
