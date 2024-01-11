import { Expose } from 'class-transformer';
import { Alumni, Graduation } from '../alumni.type';

export class AlumniDto implements Omit<Alumni, 'password'> {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() names: string;
  @Expose() surnames: string;
  @Expose() birthDate: Date;
  @Expose() graduations: Graduation[];
  @Expose() address: string | null;
}
