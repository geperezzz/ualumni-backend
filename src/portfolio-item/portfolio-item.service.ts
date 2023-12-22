import { Injectable } from '@nestjs/common';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import { Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PortfolioItemDto } from './dto/portfolio-item.dto';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class PortfolioItemService {
  constructor(private readonly ualumniDbService: UalumniDbService) {}

  async create(
    resumeOwnerId: string,
    createPortfolioItemDto: CreatePortfolioItemDto,
  ): Promise<PortfolioItemDto> {
    try {
      return await this.ualumniDbService.portfolioItem.create({
        data: {
          resumeOwnerId,
          title: createPortfolioItemDto.title,
          sourceLink: createPortfolioItemDto.sourceLink,
          isVisible: createPortfolioItemDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `El link proporcionado ya existe \`sourceLink\` (${createPortfolioItemDto.sourceLink}) por el egresado con \`id\` (${resumeOwnerId})`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `No existe usuario con el siguiente \`id\` (${resumeOwnerId})`,
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
    resumeOwnerId: string,
    page: number,
    perPage: number,
  ): Promise<PageDto<PortfolioItemDto>> {
    try {
      const totalCount = await this.ualumniDbService.portfolioItem.count({
        where: { resumeOwnerId },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (totalCount == 0 || page < 1) {
        page = 1;
      } else if (page > pageCount) {
        page = pageCount;
      }
      const data = await this.ualumniDbService.portfolioItem.findMany({
        where: {
          resumeOwnerId,
        },
        take: perPage,
        skip: (page - 1) * perPage,
      });
      return {
        page,
        perPage: data.length,
        pageCount,
        totalCount,
        items: data,
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    title: string,
    resumeOwnerId: string,
    updatePortfolioItemDto: UpdatePortfolioItemDto,
  ): Promise<PortfolioItemDto> {
    try {
      return await this.ualumniDbService.portfolioItem.update({
        where: {
          resumeOwnerId_title: {
            title,
            resumeOwnerId,
          },
        },
        data: {
          title: updatePortfolioItemDto.title,
          sourceLink: updatePortfolioItemDto.sourceLink,
          isVisible: updatePortfolioItemDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `No existe Item de portafolio con el siguiente titulo \`title\` (${title})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `No puede actualizarse ya que ya existe \`title\` (${updatePortfolioItemDto.title}) para el egresado con \`id\` (${resumeOwnerId})`,
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
    title: string,
    resumeOwnerId: string,
  ): Promise<PortfolioItemDto | null> {
    try {
      return await this.ualumniDbService.portfolioItem.findUnique({
        where: {
          resumeOwnerId_title: {
            title,
            resumeOwnerId,
          },
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(
    title: string,
    resumeOwnerId: string,
  ): Promise<PortfolioItemDto> {
    try {
      return await this.ualumniDbService.portfolioItem.delete({
        where: {
          resumeOwnerId_title: {
            title,
            resumeOwnerId,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no higher education study with the given \`title\` (${title})`,
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
