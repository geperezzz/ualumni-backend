import { Injectable } from '@nestjs/common';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Alumni, Prisma } from '@prisma/client';
import { AlreadyExistsError, NotFoundError, UnexpectedError } from 'src/common/error/service.error';

@Injectable()
export class AlumniService {
  constructor(private prismaService: PrismaService) {}

  async create(createAlumniDto: CreateAlumniDto): Promise<Alumni> {
    try {
      return await this.prismaService.alumni.create({
        data: createAlumniDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists an alumni with the given \`email\` (${createAlumniDto.email})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findAll(): Promise<Alumni[]> {
    try {
      return await this.prismaService.alumni.findMany();
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      }); 
    }
  }

  async findOne(email: string): Promise<Alumni | null> {
    try {
      return await this.prismaService.alumni.findFirst({
        where: { email },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      }); 
    }
  }

  async update(
    email: string,
    updateAlumniDto: UpdateAlumniDto,
  ): Promise<Alumni> {
    try {
      return await this.prismaService.alumni.update({
        where: { email },
        data: updateAlumniDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no alumni with the given \`email\` (${email})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`email\` to \`${updateAlumniDto.email}\`, there already exists an alumni with the same \`email\``,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(email: string): Promise<Alumni> {
    try {
      return await this.prismaService.alumni.delete({
        where: { email },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new NotFoundError(
            `There is no alumni with the given \`email\` (${email})`,
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
