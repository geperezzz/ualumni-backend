import { ResumeDto } from 'src/resume/dto/resume.dto';
import { AlumniWithoutContactDto } from './alumni-without-contact.dto';
import { Expose } from 'class-transformer';

export class AlumniWithResumeWithoutContactDto extends AlumniWithoutContactDto {
  @Expose()
  resume: ResumeDto;
}
