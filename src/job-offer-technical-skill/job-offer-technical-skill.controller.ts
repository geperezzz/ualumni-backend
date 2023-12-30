import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobOfferTechnicalSkillService } from './job-offer-technical-skill.service';
import { CreateJobOfferTechnicalSkillDto } from './dto/create-job-offer-technical-skill.dto';
import { UpdateJobOfferTechnicalSkillDto } from './dto/update-job-offer-technical-skill.dto';

@Controller('job-offer-technical-skill')
export class JobOfferTechnicalSkillController {
  constructor(private readonly jobOfferTechnicalSkillService: JobOfferTechnicalSkillService) {}

  @Post()
  create(@Body() createJobOfferTechnicalSkillDto: CreateJobOfferTechnicalSkillDto) {
    return this.jobOfferTechnicalSkillService.create(createJobOfferTechnicalSkillDto);
  }

  @Get()
  findAll() {
    return this.jobOfferTechnicalSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobOfferTechnicalSkillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobOfferTechnicalSkillDto: UpdateJobOfferTechnicalSkillDto) {
    return this.jobOfferTechnicalSkillService.update(+id, updateJobOfferTechnicalSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobOfferTechnicalSkillService.remove(+id);
  }
}
