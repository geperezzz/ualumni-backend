import { Injectable } from '@nestjs/common';
import { CreateAlumniToVerifyDto } from './dto/create-alumni-to-verify.dto';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { Prisma as PrismaUalumni } from 'prisma/ualumni/client';
import { AlumniToVerify } from 'prisma/ualumni/client';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { AlumniService } from 'src/alumni/alumni.service';

@Injectable()
export class AlumniToVerifyService {
  constructor(
    private alumniService: AlumniService,
    private ualumniDbService: UalumniDbService,
  ) {}

  async create(
    createAlumnitoVerifyDto: CreateAlumniToVerifyDto,
  ): Promise<AlumniToVerify> {
    const isAnAlumni = await this.alumniService.findUcabDbAlumni(
      createAlumnitoVerifyDto.email,
    );
    if (!isAnAlumni) {
      throw new NotFoundError(`There is no alumni with \`email\` equal to \`${createAlumnitoVerifyDto.email}\``, {});
    }

    const isAlreadyRegistrated = await this.alumniService.findOne(
      createAlumnitoVerifyDto.email,
    );
    if (isAlreadyRegistrated) {
      throw new AlreadyExistsError(`The alumni with \`email\` equal to \`${createAlumnitoVerifyDto.email}\` is already registered`, {});
    }
    
    const token = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      const alumniToVerify = await this.ualumniDbService.alumniToVerify.create({
        data: {
          email: createAlumnitoVerifyDto.email,
          password: createAlumnitoVerifyDto.password,
          token,
        },
      });

      return alumniToVerify;
    } catch (error) {
      if (error instanceof PrismaUalumni.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists an alumni to verify with the given \`email\` (${createAlumnitoVerifyDto.email})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(
    alumniEmail: string,
  ): Promise<AlumniToVerify | null> {
    try {
      return await this.ualumniDbService.alumniToVerify.findUnique({
        where: {
          email: alumniEmail
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(alumniEmail: string): Promise<AlumniToVerify> {
    try {
      return await this.ualumniDbService.alumniToVerify.delete({
        where: {
          email: alumniEmail,
        },
      });
    } catch (error) {
      if (error instanceof PrismaUalumni.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no alumni to verify with the given \`email\` (${alumniEmail})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }
}
