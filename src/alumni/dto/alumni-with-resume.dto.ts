import { Expose } from 'class-transformer';
import { AlumniDto } from './alumni.dto';
import { ResumeDto } from 'src/resume/dto/resume.dto';

export class AlumniWithResumeDto extends AlumniDto {
  @Expose()
  resume: ResumeDto;
}
