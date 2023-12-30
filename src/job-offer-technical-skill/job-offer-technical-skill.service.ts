import { Injectable } from '@nestjs/common';
import { CreateJobOfferTechnicalSkillDto } from './dto/create-job-offer-technical-skill.dto';
import { UpdateJobOfferTechnicalSkillDto } from './dto/update-job-offer-technical-skill.dto';

@Injectable()
export class JobOfferTechnicalSkillService {
  create(createJobOfferTechnicalSkillDto: CreateJobOfferTechnicalSkillDto) {
    return 'This action adds a new jobOfferTechnicalSkill';
  }

  findAll() {
    return `This action returns all jobOfferTechnicalSkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobOfferTechnicalSkill`;
  }

  update(id: number, updateJobOfferTechnicalSkillDto: UpdateJobOfferTechnicalSkillDto) {
    return `This action updates a #${id} jobOfferTechnicalSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobOfferTechnicalSkill`;
  }
}
