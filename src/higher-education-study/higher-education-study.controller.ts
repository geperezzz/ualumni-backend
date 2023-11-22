import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HigherEducationStudyService } from './higher-education-study.service';
import { CreateHigherEducationStudyDto } from './dto/create-higher-education-study.dto';
import { UpdateHigherEducationStudyDto } from './dto/update-higher-education-study.dto';

@Controller('higher-education-study')
export class HigherEducationStudyController {
  constructor(private readonly higherEducationStudyService: HigherEducationStudyService) {}

  @Post()
  create(@Body() createHigherEducationStudyDto: CreateHigherEducationStudyDto) {
    return this.higherEducationStudyService.create(createHigherEducationStudyDto);
  }

  @Get()
  findAll() {
    return this.higherEducationStudyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.higherEducationStudyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHigherEducationStudyDto: UpdateHigherEducationStudyDto) {
    return this.higherEducationStudyService.update(+id, updateHigherEducationStudyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.higherEducationStudyService.remove(+id);
  }
}
