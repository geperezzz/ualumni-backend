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
  HttpException,
  DefaultValuePipe,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Query,
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

@ApiTags('portfolio-item')
@Controller('user/:email/resume/portfolio-item')
export class PortfolioItemController {
  constructor(private readonly portfolioItemService: PortfolioItemService) {}

  @Post()
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
  ) {
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

  @Get()
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
  @Get(':title')
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
    @Param('email') resumeOwnerEmail: string,
    @Param('title') title: string,
    @Param('sourceLink') sourceLink: string,
  ) {
    const portfolioItem = await this.portfolioItemService.findOne(
      title,
      resumeOwnerEmail,
      sourceLink,
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

  @Patch(':title')
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
    @Param('email') resumeOwnerEmail: string,
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

  @Delete(':title')
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
    @Param('email') resumeOwnerEmail: string,
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
