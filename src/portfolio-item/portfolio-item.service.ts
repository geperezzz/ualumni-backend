import { Injectable } from '@nestjs/common';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import { PrismaService } from 'src/ualumni-database/prisma.service';
import { Prisma } from '@prisma/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PortfolioItemDto } from './dto/portfolio-item.dto';
import { PortfolioItem } from './entities/portfolio-item.entity';

@Injectable()
export class PortfolioItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    resumeOwnerEmail: string,
    createPortfolioItemDto: CreatePortfolioItemDto,
  ) {
    try {
      return await this.prismaService.portfolioItem.create({
        data: {
          resumeOwnerEmail: resumeOwnerEmail,
          title: createPortfolioItemDto.title,
          sourceLink: createPortfolioItemDto.sourceLink,
          isVisible: createPortfolioItemDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `El link proporcionado ya existe \`sourceLink\` (${createPortfolioItemDto.sourceLink}) por el usuario \`email\` (${resumeOwnerEmail})`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `No existe usuario con el siguient email \`email\` (${resumeOwnerEmail})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    title: string,
    resumeOwnerEmail: string,
    updatePortfolioItemDto: UpdatePortfolioItemDto,
  ): Promise<PortfolioItemDto> {
    try {
      return await this.prismaService.portfolioItem.update({
        where: {
          resumeOwnerEmail_title: {
            title,
            resumeOwnerEmail,
          },
        },
        data: {},
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
            `No puede actualizarse ya que ya existe \`title\` (${updatePortfolioItemDto.title}) para el usuario \`email\` (${resumeOwnerEmail})`,
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
    resumeOwnerEmail: string,
    sourceLink: string,
  ): Promise<PortfolioItemDto | null> {
    try {
      return await this.prismaService.portfolioItem.findUnique({
        where: {
          resumeOwnerEmail_title: {
            title,
            resumeOwnerEmail,
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
    resumeOwnerEmail: string,
  ): Promise<PortfolioItemDto> {
    try {
      return await this.prismaService.portfolioItem.delete({
        where: {
          resumeOwnerEmail_title: {
            title,
            resumeOwnerEmail,
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
