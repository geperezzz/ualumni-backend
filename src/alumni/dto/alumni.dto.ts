import { Expose } from 'class-transformer';

export class AlumniCareerDto {
  careerName: string;
  graduationDate: Date;
}

export class AlumniDto {
  @Expose() email: string;
  @Expose() names: string;
  @Expose() surnames: string;
  @Expose() address: string | null;
  @Expose() telephoneNumber: string | null;
  @Expose() careers: AlumniCareerDto[];
}
