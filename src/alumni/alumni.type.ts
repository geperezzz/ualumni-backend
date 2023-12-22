import {
  User,
  Alumni as PrismaAlumni,
  Graduation as PrismaGraduation,
} from 'prisma/ualumni/client';

export type Graduation = Omit<PrismaGraduation, 'alumniId'>;

export type Alumni = Omit<User, 'role'> &
  Omit<PrismaAlumni, 'id'> & {
    graduations: Graduation[];
  };
