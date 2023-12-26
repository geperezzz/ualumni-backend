import { Injectable } from '@nestjs/common';
import { User } from 'prisma/ualumni/client';
import { UnexpectedError } from 'src/common/errors/service.error';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class UsersService {
  constructor(private ualumniDbService: UalumniDbService) {}

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.ualumniDbService.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.ualumniDbService.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }
}
