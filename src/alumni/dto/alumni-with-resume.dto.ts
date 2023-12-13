import { Expose } from 'class-transformer';
import { AlumniDto } from './alumni.dto';
import { ResumeDto } from 'src/resume/dto/resume.dto';
import { AlumniWithResume } from '../alumni-with-resume.type';

export class AlumniWithResumeDto extends AlumniDto implements Omit<AlumniWithResume, 'password'> {
  @Expose()
  resume: ResumeDto;
}
