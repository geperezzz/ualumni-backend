import { Expose } from 'class-transformer';

export class AlumniGraduationDto {
  careerName: string;
  graduationDate: Date;
}

export class AlumniWithoutContactDto {
  @Expose() id: string;
  @Expose() names: string;
  @Expose() surnames: string;
  @Expose() birthDate: Date;
  @Expose() graduations: AlumniGraduationDto[];
}
