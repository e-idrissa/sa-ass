import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { VerifyRequestDto } from 'src/common/dto/verify.dto';

@Controller('verify')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  generateVerificationLink(@Body() verifyRequest: VerifyRequestDto) {
    return this.verifyService.generateVerificationLink(verifyRequest);
  }
}
