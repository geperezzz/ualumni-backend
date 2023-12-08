import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PortfolioItemService } from './portfolio-item.service';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
} from 'src/common/error/service.error';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PortfolioItemDto } from './dto/portfolio-item.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from '@prisma/client';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';

@ApiTags('portfolio-item')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class PortfolioItemController {
  constructor(private readonly portfolioItemService: PortfolioItemService) {}

  @Post('me/portfolio-item')
  @Allowed('alumni')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The Portfolio item was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a Portfolio item with the given title',
  })
  async createMine(
    @SessionUser() user: User,
    @Body() createPortfolioItemDto: CreatePortfolioItemDto,
  ): Promise<ResponseDto<PortfolioItemDto>> {
    try {
      const data = await this.portfolioItemService.create(
        user.email,
        createPortfolioItemDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      if (error instanceof ForeignKeyError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Post(':email/portfolio-item')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The Portfolio item was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a Portfolio item with the given title',
  })
  async create(
    @Param('email') resumeOwnerEmail: string,
    @Body() createPortfolioItemDto: CreatePortfolioItemDto,
  ): Promise<ResponseDto<PortfolioItemDto>> {
    try {
      const data = await this.portfolioItemService.create(
        resumeOwnerEmail,
        createPortfolioItemDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      if (error instanceof ForeignKeyError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get('me/portfolio-item')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of Portfolio items was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMyPage(
    @SessionUser() user: User,
    @Query() paginationParamsDto: PaginationParamsDto,
  ) {
    try {
      const data = await this.portfolioItemService.findMany(
        user.email,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
      );
      return {
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get(':alumniEmail/portfolio')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of Portfolio items was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findPage(
    @Param('alumniEmail') alumniEmail: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ) {
    try {
      const data = await this.portfolioItemService.findMany(
        alumniEmail,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
      );
      return {
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get('me/portfolio-item/:title')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A Portfolio item was succesfully found',
  })
  @ApiNotFoundResponse({
    description: 'The Portfolio item for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMine(@SessionUser() user: User, @Param('title') title: string) {
    const portfolioItem = await this.portfolioItemService.findOne(
      title,
      user.email,
    );

    if (!portfolioItem)
      throw new NotFoundException(
        `There is no Portfolio item with the given \`title\` (${title})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: portfolioItem,
    };
  }

  @Get(':alumniEmail/portfolio-item/:title')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A Portfolio item was succesfully found',
  })
  @ApiNotFoundResponse({
    description: 'The Portfolio item for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('alumniEmail') alumniEmail: string,
    @Param('title') title: string,
  ) {
    const portfolioItem = await this.portfolioItemService.findOne(
      title,
      alumniEmail,
    );

    if (!portfolioItem)
      throw new NotFoundException(
        `There is no Portfolio item with the given \`title\` (${title})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: portfolioItem,
    };
  }

  @Patch('me/portfolio-item/:title')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Portfolio item was succesfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The Portfolio item with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a Portfolio itemstudy with the given title',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async updateMine(
    @SessionUser() user: User,
    @Param('title') title: string,
    @Body() updatePortfolioItemDto: UpdatePortfolioItemDto,
  ) {
    try {
      const updatedHigherEducationStudy =
        await this.portfolioItemService.update(
          title,
          user.email,
          updatePortfolioItemDto,
        );
      return { statusCode: HttpStatus.OK, data: updatedHigherEducationStudy };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Patch(':alumniEmail/portfolio-item/:title')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Portfolio item was succesfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The Portfolio item with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a Portfolio itemstudy with the given title',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('alumniEmail') resumeOwnerEmail: string,
    @Param('title') title: string,
    @Body() updatePortfolioItemDto: UpdatePortfolioItemDto,
  ) {
    try {
      const updatedHigherEducationStudy =
        await this.portfolioItemService.update(
          title,
          resumeOwnerEmail,
          updatePortfolioItemDto,
        );
      return { statusCode: HttpStatus.OK, data: updatedHigherEducationStudy };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Delete('me/portfolio-item/:title')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Portfolio item was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'The Portfolio item with the requested title was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async removeMine(
    @SessionUser() user: User,
    @Param('title') title: string,
  ): Promise<ResponseDto<PortfolioItemDto>> {
    try {
      const deletedHigherEducationStudy =
        await this.portfolioItemService.remove(title, user.email);
      return {
        statusCode: HttpStatus.OK,
        data: deletedHigherEducationStudy,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Delete(':alumniEmail/portfolio-item/:title')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Portfolio item was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'The Portfolio item with the requested title was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('alumniEmail') resumeOwnerEmail: string,
    @Param('title') title: string,
  ): Promise<ResponseDto<PortfolioItemDto>> {
    try {
      const deletedHigherEducationStudy =
        await this.portfolioItemService.remove(title, resumeOwnerEmail);
      return {
        statusCode: HttpStatus.OK,
        data: deletedHigherEducationStudy,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }
}
