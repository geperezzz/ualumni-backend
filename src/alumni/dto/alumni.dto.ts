import { Expose } from 'class-transformer';
import { Alumni, Graduation } from '../alumni.type';

@Expose()
export class AlumniDto implements Omit<Alumni, 'password'> {
  email: string;
  names: string;
  surnames: string;
  graduations: Graduation[];
  address: string | null;
  telephoneNumber: string | null;
}
