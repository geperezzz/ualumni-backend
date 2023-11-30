import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AlumniService } from 'src/alumni/alumni.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private alumniService: AlumniService) {
    super({
      usernameField: 'alumniEmail',
      session: true,
    });
  }

  async validate(alumniEmail: string, password: string) {
    let alumni = await this.alumniService.findOne(alumniEmail);

    if (!alumni) {
      throw new UnauthorizedException(
        `There is no alumni with \`email\` equal to \`${alumniEmail}\``,
      );
    }

    let isPasswordCorrect = await bcrypt.compare(password, alumni.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        `Incorrect password (${password}) for alumni with \`email\` equal to \`${alumniEmail}\``,
      );
    }

    return alumni;
  }
}
