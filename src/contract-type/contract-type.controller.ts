import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  BadRequestException,
  InternalServerErrorException,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ContractTypeService } from './contract-type.service';
import { ContractTypeDto } from './dto/contract-type.dto';
import { CreateContractTypeDto } from './dto/create-contract-type.dto';
import { UpdateContractTypeDto } from './dto/update-contract-type.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { AlreadyExistsError, NotFoundError } from 'src/common/errors/service.error';

@ApiTags('contract-type')
@Controller('contract-type')
export class ContractTypeController {
  constructor(private readonly contractTypeService: ContractTypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Contract type was succesfully created' })
  @ApiBadRequestResponse({
    description: 'Alredy exists a contract type with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Body() createContractTypeDto: CreateContractTypeDto,
  ): Promise<ResponseDto<ContractTypeDto>> {
    try {
      const data = await this.contractTypeService.create(createContractTypeDto);
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
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
    description: 'The list of contract types was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMany(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<PaginatedResponseDto<ContractTypeDto>> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.contractTypeService.findMany(
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

  @Get(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Contract type was succesfully found' })
  @ApiNotFoundResponse({
    description: 'The contract type with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('name') name: string,
  ): Promise<ResponseDto<ContractTypeDto>> {
    const data = await this.contractTypeService.findOne(name);
    if (!data)
      throw new NotFoundException(
        `There is no contract type with the given \`name\` (${name})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Put(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Contract type was succesfully updated' })
  @ApiNotFoundResponse({
    description: 'The contract type with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a contract type with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('name') name: string,
    @Body() updateContractTypeDto: UpdateContractTypeDto,
  ): Promise<ResponseDto<ContractTypeDto>> {
    try {
      const updatedContractType = await this.contractTypeService.update(
        name,
        updateContractTypeDto,
      );
      return {
        statusCode: HttpStatus.OK,
        data: updatedContractType,
      };
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundException(error.message, { cause: error });
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Delete(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Contract type was succesfully deleted' })
  @ApiNotFoundResponse({
    description: 'The contract type with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('name') name: string,
  ): Promise<ResponseDto<ContractTypeDto>> {
    try {
      const deletedContractType = await this.contractTypeService.remove(name);
      return {
        statusCode: HttpStatus.OK,
        data: deletedContractType,
      };
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }
}
