import { Expose } from 'class-transformer';
import { Alumni, Graduation } from '../alumni.type';

export class AlumniDto implements Omit<Alumni, 'password'> {
  @Expose() email: string;
  @Expose() names: string;
  @Expose() surnames: string;
  @Expose() graduations: Graduation[];
  @Expose() address: string | null;
  @Expose() telephoneNumber: string | null;
}
