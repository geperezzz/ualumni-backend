import { User, Alumni as AlumniModel, Graduation } from '@prisma/client';

export type Alumni = Omit<User, 'role'> &
  Omit<AlumniModel, 'email'> & {
    careers: Omit<Graduation, 'alumniEmail'>[];
  };
