import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiapCoursesService } from './ciap-courses.service';
import { CreateCiapCourseDto } from './dto/create-ciap-course.dto';
import { UpdateCiapCourseDto } from './dto/update-ciap-course.dto';

@Controller('ciap-courses')
export class CiapCoursesController {
  constructor(private readonly ciapCoursesService: CiapCoursesService) {}

  @Post()
  create(@Body() createCiapCourseDto: CreateCiapCourseDto) {
    return this.ciapCoursesService.create(createCiapCourseDto);
  }

  @Get()
  findAll() {
    return this.ciapCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciapCoursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiapCourseDto: UpdateCiapCourseDto) {
    return this.ciapCoursesService.update(+id, updateCiapCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciapCoursesService.remove(+id);
  }
}
