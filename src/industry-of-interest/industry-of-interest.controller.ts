import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  DefaultValuePipe,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IndustryOfInterestService } from './industry-of-interest.service';
import { CreateIndustryOfInterestDto } from './dto/create-industry-of-interest.dto';
import { UpdateIndustryOfInterestDto } from './dto/update-industry-of-interest.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
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
import { IndustryOfInterestDto } from './dto/industry-of-interest.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@ApiTags('industry-of-interest')
@Controller('user/:email/resume/industry-of-interest')
export class IndustryOfInterestController {
  constructor(
    private readonly industryOfInterestService: IndustryOfInterestService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'industry of interest was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Alredy exists a industry of interest with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Body() createIndustryOfInterestDto: CreateIndustryOfInterestDto,
  ): Promise<ResponseDto<IndustryOfInterestDto>> {
    try {
      const data = await this.industryOfInterestService.create(
        createIndustryOfInterestDto,
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
    description: 'The list of industries of interest was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMany(
    @Param('email') resumeOwnerEmail: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<PaginatedResponseDto<IndustryOfInterestDto>> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.industryOfInterestService.findMany(
        resumeOwnerEmail,
        page,
        perPage,
      );
      return {
        statusCode: HttpStatus.OK,
        data: paginationResponse,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get(':industryName')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('email') resumeOwnerEmail: string,
    @Param('industryName') industryName: string,
  ) {
    const industryOfInterest = await this.industryOfInterestService.findOne(
      resumeOwnerEmail,
      industryName,
    );

    if (!industryOfInterest)
      throw new NotFoundException(
        `There is no industry of interest with the given \`name\` (${industryName})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: industryOfInterest,
    };
  }

  @Patch(':industryName')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a industry of interest with the given title',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('email') resumeOwnerEmail: string,
    @Param('industryName') industryName: string,
    @Body() updateIndustryOfInterestDto: UpdateIndustryOfInterestDto,
  ) {
    try {
      const updatedIndustryOfInterest =
        await this.industryOfInterestService.update(
          resumeOwnerEmail,
          industryName,
          updateIndustryOfInterestDto,
        );
      return { statusCode: HttpStatus.OK, data: updatedIndustryOfInterest };
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

  @Delete(':industryName')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('email') resumeOwnerEmail: string,
    @Param('industryName') industryName: string,
  ): Promise<ResponseDto<IndustryOfInterestDto>> {
    try {
      const deletedIndustryOfInterest =
        await this.industryOfInterestService.remove(
          resumeOwnerEmail,
          industryName,
        );
      return {
        statusCode: HttpStatus.OK,
        data: deletedIndustryOfInterest,
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
