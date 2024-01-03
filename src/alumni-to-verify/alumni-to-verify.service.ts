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
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { UcabDbService } from 'src/ucab-db/ucab-db.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlumniToVerifyService {
  constructor(
    private alumniService: AlumniService,
    private ualumniDbService: UalumniDbService,
    private ucabDbService: UcabDbService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  private async sendVerificationEmail(alumniToVerify: AlumniToVerify) {
    const alumni = await this.ucabDbService.student.findUnique({
      where: { email: alumniToVerify.email },
    });
    const name = `${alumni?.names.split(' ')[0]} ${alumni?.surnames.split(
      ' ',
    )[0]}`;

    const link = `${this.configService.getOrThrow(
      'FRONTEND_URL',
    )}/confirm-email?token=${alumniToVerify.token}&email=${
      alumniToVerify.email
    }`; // probablemente deba ser un link del front pero shh

    try {
      await this.mailerService.sendMail({
        to: alumniToVerify.email,
        subject: `Verificación  UAlumni - ${name}`,
        template: './email-verification',
        context: {
          alumni: name,
          token: alumniToVerify.token,
          link,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: 'src/templates/images/logo.png',
            cid: 'logo',
          },
          {
            filename: 'instagram.png',
            path: 'src/templates/images/instagram.png',
            cid: 'instagram',
          },
        ],
      });
    } catch (error) {
      throw new UnexpectedError(
        'An unexpected situation ocurred while sending the verification email',
      );
    }
  }

  async create(
    createAlumnitoVerifyDto: CreateAlumniToVerifyDto,
  ): Promise<AlumniToVerify> {
    const isAnAlumni = await this.alumniService.findUcabDbAlumni(
      createAlumnitoVerifyDto.email,
    );
    if (!isAnAlumni) {
      throw new NotFoundError(
        `There is no alumni with \`email\` equal to \`${createAlumnitoVerifyDto.email}\``,
        {},
      );
    }

    const isAlreadyRegistrated = await this.alumniService.findOneByEmail(
      createAlumnitoVerifyDto.email,
    );
    if (isAlreadyRegistrated) {
      throw new AlreadyExistsError(
        `The alumni with \`email\` equal to \`${createAlumnitoVerifyDto.email}\` is already registered`,
        {},
      );
    }

    const token = Math.floor(1000 + Math.random() * 9000).toString();

    let alumniToVerify: AlumniToVerify;
    try {
      alumniToVerify = await this.ualumniDbService.alumniToVerify.upsert({
        where: {
          email: createAlumnitoVerifyDto.email,
        },
        create: {
          email: createAlumnitoVerifyDto.email,
          password: createAlumnitoVerifyDto.password,
          token,
        },
        update: {
          password: createAlumnitoVerifyDto.password,
          token,
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }

    await this.sendVerificationEmail(alumniToVerify);
    return alumniToVerify;
  }

  async findOne(alumniEmail: string): Promise<AlumniToVerify | null> {
    try {
      return await this.ualumniDbService.alumniToVerify.findUnique({
        where: {
          email: alumniEmail,
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

  @Cron(CronExpression.EVERY_HOUR)
  async autoRemove() {
    try {
      let expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() - 5); // 5 hours to expire

      const expiredRegisters =
        await this.ualumniDbService.alumniToVerify.deleteMany({
          where: { creationDate: { lte: expirationTime } },
        });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }
}
