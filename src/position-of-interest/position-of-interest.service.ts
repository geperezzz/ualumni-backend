import { Injectable } from '@nestjs/common';
import { CreatePositionOfInterestDto } from './dto/create-position-of-interest.dto';
import { UpdatePositionOfInterestDto } from './dto/update-position-of-interest.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { PositionOfInterestDto } from './dto/position-of-interest.dto';
import { Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class PositionOfInterestService {
  constructor(private readonly ualumniDbService: UalumniDbService) {}
  async create(
    resumeOwnerEmail: string,
    createPositionOfInterestDto: CreatePositionOfInterestDto,
  ): Promise<PositionOfInterestDto> {
    try {
      return await this.ualumniDbService.positionOfInterest.create({
        data: {
          resumeOwnerEmail: resumeOwnerEmail,
          ...createPositionOfInterestDto,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a position of interest with the given \`name\` (${createPositionOfInterestDto.positionName}) for the user \`email\`: ${resumeOwnerEmail}`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no user with the given \`email\` (${resumeOwnerEmail})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findMany(
    resumeOwnerEmail: string,
    page: number,
    perPage: number,
  ): Promise<PageDto<PositionOfInterestDto>> {
    try {
      const totalCount = await this.ualumniDbService.positionOfInterest.count({
        where: { resumeOwnerEmail },
      });
      const pageCount = Math.ceil(totalCount / perPage);
      const positionsOfInterest =
        await this.ualumniDbService.positionOfInterest.findMany({
          where: { resumeOwnerEmail },
          skip: (page - 1) * perPage,
          take: perPage,
        });
      return {
        totalCount,
        pageCount,
        page,
        perPage,
        items: positionsOfInterest,
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(
    resumeOwnerEmail: string,
    positionName: string,
  ): Promise<PositionOfInterestDto | null> {
    try {
      return await this.ualumniDbService.positionOfInterest.findUnique({
        where: {
          resumeOwnerEmail_positionName: { resumeOwnerEmail, positionName },
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    resumeOwnerEmail: string,
    positionName: string,
    updatePositionOfInterestDto: UpdatePositionOfInterestDto,
  ): Promise<PositionOfInterestDto> {
    try {
      return await this.ualumniDbService.positionOfInterest.update({
        where: {
          resumeOwnerEmail_positionName: { resumeOwnerEmail, positionName },
        },
        data: updatePositionOfInterestDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no position of interest with the given \`name\` (${positionName})`,
            { cause: error },
          );
        } else if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updatePositionOfInterestDto.positionName}\`, there already exists a industry of interest with the given \`name\` (${updatePositionOfInterestDto.positionName}) for the user \`email\`: ${resumeOwnerEmail}`,
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(
    resumeOwnerEmail: string,
    positionName: string,
  ): Promise<PositionOfInterestDto> {
    try {
      return await this.ualumniDbService.positionOfInterest.delete({
        where: {
          resumeOwnerEmail_positionName: { resumeOwnerEmail, positionName },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no position of interest with the given \`name\` (${positionName})`,
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
