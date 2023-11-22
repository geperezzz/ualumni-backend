import { Injectable } from '@nestjs/common';
import { CreateHigherEducationStudyDto } from './dto/create-higher-education-study.dto';
import { UpdateHigherEducationStudyDto } from './dto/update-higher-education-study.dto';

@Injectable()
export class HigherEducationStudyService {
  create(createHigherEducationStudyDto: CreateHigherEducationStudyDto) {
    return 'This action adds a new higherEducationStudy';
  }

  findAll() {
    return `This action returns all higherEducationStudy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} higherEducationStudy`;
  }

  update(id: number, updateHigherEducationStudyDto: UpdateHigherEducationStudyDto) {
    return `This action updates a #${id} higherEducationStudy`;
  }

  remove(id: number) {
    return `This action removes a #${id} higherEducationStudy`;
  }
}
