import { Injectable } from '@nestjs/common';
import { CreateGraduationDto } from './dto/create-graduation.dto';
import { UpdateGraduationDto } from './dto/update-graduation.dto';
import { Graduation, Prisma } from '../../prisma/ualumni/client';
import { Page } from 'src/common/interfaces/page.interface';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class GraduationsService {
  constructor(private ualumniDbService: UalumniDbService) {}

  async create(
    alumniEmail: string,
    createGraduationDto: CreateGraduationDto,
  ): Promise<Graduation> {
    try {
      return await this.ualumniDbService.graduation.create({
        data: {
          alumniEmail,
          ...createGraduationDto,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Alumni with \`email\` equal to \`${alumniEmail}\` has already graduated from a career with \`name\` equal to \`${createGraduationDto.careerName}\``,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          let fieldName = error.meta?.field_name as string;
          if (fieldName.includes('alumniEmail')) {
            throw new NotFoundError(
              `There is no alumni with \`email\` equal to \`${alumniEmail}\``,
            );
          }
          if (fieldName.includes('careerName')) {
            throw new NotFoundError(
              `There is no career with \`name\` equal to \`${createGraduationDto.careerName}\``,
            );
          }
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findPage(
    alumniEmail: string,
    { pageNumber, itemsPerPage }: PaginationParamsDto,
  ): Promise<Page<Graduation>> {
    try {
      let [items, numberOfItems] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.graduation.findMany({
          where: { alumniEmail },
          take: itemsPerPage,
          skip: itemsPerPage * (pageNumber - 1),
        }),
        this.ualumniDbService.graduation.count(),
      ]);

      return {
        items,
        meta: {
          pageNumber,
          itemsPerPage,
          numberOfItems,
          numberOfPages: Math.ceil(numberOfItems / itemsPerPage),
        },
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(
    alumniEmail: string,
    careerName: string,
  ): Promise<Graduation | null> {
    try {
      return await this.ualumniDbService.graduation.findUnique({
        where: {
          careerName_alumniEmail: {
            careerName,
            alumniEmail,
          },
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    alumniEmail: string,
    careerName: string,
    updateGraduationDto: UpdateGraduationDto,
  ): Promise<Graduation> {
    try {
      return await this.ualumniDbService.graduation.update({
        where: {
          careerName_alumniEmail: {
            careerName,
            alumniEmail,
          },
        },
        data: updateGraduationDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `Alumni with \`email\` equal to \`${alumniEmail}\` has not graduated from a career with \`name\` equal to \`${careerName}\``,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`careerName\` to \`${updateGraduationDto.careerName}\`, alumni with \`email\` equal to \`${alumniEmail}\` has already graduated from that career`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(alumniEmail: string, careerName: string): Promise<Graduation> {
    try {
      return await this.ualumniDbService.graduation.delete({
        where: {
          careerName_alumniEmail: {
            careerName,
            alumniEmail,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `Alumni with \`email\` equal to \`${alumniEmail}\` has not graduated from a career with \`name\` equal to \`${careerName}\``,
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
