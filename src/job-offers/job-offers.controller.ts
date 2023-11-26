import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/errors/service.error';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Post()
  async create(@Body() createJobOfferDto: CreateJobOfferDto) {
    try {
      let createdJobOffer =
        await this.jobOffersService.create(createJobOfferDto);

      return {
        statusCode: HttpStatus.CREATED,
        data: createdJobOffer,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Get()
  async findPageRandomly(
    @Query() randomPaginationParamsDto: RandomPaginationParamsDto,
  ) {
    let jobOfferRandomPage = await this.jobOffersService.findPageRandomly(
      randomPaginationParamsDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: jobOfferRandomPage,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    let jobOffer = await this.jobOffersService.findOne(id);

    if (!jobOffer) {
      throw new NotFoundException(
        `There is no job offer with the given \`id\` (${id})`,
        {},
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: jobOffer,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateJobOfferDto: UpdateJobOfferDto,
  ) {
    try {
      let updatedJobOffer = await this.jobOffersService.update(
        id,
        updateJobOfferDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: updatedJobOffer,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      let removedJobOffer = await this.jobOffersService.remove(id);

      return {
        statusCode: HttpStatus.CREATED,
        data: removedJobOffer,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }
}