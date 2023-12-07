import { Expose } from 'class-transformer';

export class AlumniCareerDto {
  careerName: string;
  graduationDate: Date;
}

export class AlumniWithoutContactDto {
  @Expose() email: string;
  @Expose() names: string;
  @Expose() surnames: string;
  @Expose() careers: AlumniCareerDto[];
}
