import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UnexpectedError } from 'src/common/errors/service.error';
import { PrismaService } from 'src/ualumni-database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }
}
