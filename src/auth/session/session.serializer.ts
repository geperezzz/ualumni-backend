import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'prisma/ualumni/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(
    user: User,
    done: (error: null, userId: string) => void,
  ): void {
    done(null, user.id);
  }

  async deserializeUser(
    userId: string,
    done: (error: null, user: User | false) => void,
  ): Promise<void> {
    let user = await this.usersService.findOne(userId);
    if (!user) {
      done(null, false);
    } else {
      done(null, user);
    }
  }
}
