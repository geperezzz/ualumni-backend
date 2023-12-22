import { Injectable } from '@nestjs/common';
import { CreateAlumniToVerifyDto } from './dto/create-alumni-to-verify.dto';
import { UpdateAlumniToVerifyDto } from './dto/update-alumni-to-verify.dto';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { Alumni, Prisma as PrismaUalumni } from 'prisma/ualumni/client';
import { Prisma as PrismaUcab } from 'prisma/ucab/client';
import { AlumniToVerify } from 'prisma/ualumni/client';
import * as bcrypt from 'bcrypt';
import { UcabDbService } from 'src/ucab-db/ucab-db.service';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { MailingService } from 'src/mailing/mailing.service';

@Injectable()
export class AlumniToVerifyService {
  constructor(
    private ualumniDbService: UalumniDbService,
    private ucabDbService: UcabDbService,
    private mailingService: MailingService,
  ) {}

  private async findUcabDbAlumni(email: string): Promise<Alumni> {
    try {
      return await this.ucabDbService.student.findUniqueOrThrow({
        where: {
          email: email,
          enrolledCareers: {
            some: {
              status: 'FINISHED',
            },
          },
        },
        include: {
          enrolledCareers: {
            where: {
              status: 'FINISHED',
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaUcab.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `The given email (${email}) doesn't belong to an UCAB alumni`,
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async create(
    createAlumnitoVerifyDto: CreateAlumniToVerifyDto,
  ): Promise<AlumniToVerify> {
    const ucabDbAlumni = await this.findUcabDbAlumni(
      createAlumnitoVerifyDto.email,
    );
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      createAlumnitoVerifyDto.password,
      salt,
    );
    const token = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      const alumniToVerify = await this.ualumniDbService.alumniToVerify.create({
        data: {
          email: createAlumnitoVerifyDto.email,
          names: createAlumnitoVerifyDto.names,
          surnames: createAlumnitoVerifyDto.surnames,
          password: hashedPassword,
          token,
        },
      });

      await this.mailingService.sendVerification(
        createAlumnitoVerifyDto.email,
        token,
      );

      return alumniToVerify;
    } catch (error) {
      if (error instanceof PrismaUalumni.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists an alumni with the given \`email\` (${createAlumnitoVerifyDto.email})`,
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
