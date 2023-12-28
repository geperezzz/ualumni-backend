import { Injectable } from '@nestjs/common';
import { VerifyRegistrationParamsDto } from './dto/verify-registration-params.dto';
import { AlumniToVerifyService } from 'src/alumni-to-verify/alumni-to-verify.service';
import { InvalidCredentialsError } from './errors/auth.error';
import { AlumniService } from 'src/alumni/alumni.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private alumniToVerifyService: AlumniToVerifyService,
    private alumniService: AlumniService,
  ) {}

  async register(registerDto: RegisterDto) {
    return await this.alumniToVerifyService.create(registerDto);
  }
  
  async verifyRegistration(verifyRegistrationParamsDto: VerifyRegistrationParamsDto) {
    const alumniToVerify = await this.alumniToVerifyService.findOne(verifyRegistrationParamsDto.email);
    
    if (!alumniToVerify) {
      throw new InvalidCredentialsError();
    }
    if (verifyRegistrationParamsDto.token !== alumniToVerify.token) {
      throw new InvalidCredentialsError();
    }

    const createdAlumni = await this.alumniService.create(alumniToVerify);
    await this.alumniToVerifyService.remove(alumniToVerify.email);
    return createdAlumni;
  }
}
