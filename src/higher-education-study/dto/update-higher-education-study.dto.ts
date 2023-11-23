import { PartialType } from '@nestjs/swagger';
import { CreateHigherEducationStudyDto } from './create-higher-education-study.dto';

export class UpdateHigherEducationStudyDto extends PartialType(
  CreateHigherEducationStudyDto,
) {}
