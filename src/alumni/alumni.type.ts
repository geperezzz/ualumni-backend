import {
  User,
  Alumni as PrismaAlumni,
  Graduation as PrismaGraduation,
} from '../../prisma/ualumni/client';

export type Graduation = Omit<PrismaGraduation, 'alumniEmail'>;

export type Alumni = Omit<User, 'role'> &
  Omit<PrismaAlumni, 'email'> & {
    graduations: Graduation[];
  };
