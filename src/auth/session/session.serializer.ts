import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Alumni } from '@prisma/client';
import { AlumniService } from 'src/alumni/alumni.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private alumniService: AlumniService) {
    super();
  }

  serializeUser(
    alumni: Alumni,
    done: (error: null, alumniEmail: string) => void,
  ): void {
    done(null, alumni.email);
  }

  async deserializeUser(
    alumniEmail: string,
    done: (error: null, alumni: Alumni | false) => void,
  ): Promise<void> {
    let alumni = await this.alumniService.findOne(alumniEmail);
    if (!alumni) {
      done(null, false);
    } else {
      done(null, alumni);
    }
  }
}
