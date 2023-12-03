import { Expose } from 'class-transformer';

export class AlumniDto {
  @Expose() email: string;
  @Expose() names: string;
  @Expose() surnames: string;
}
