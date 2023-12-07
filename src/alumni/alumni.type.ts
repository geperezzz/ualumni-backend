import { User } from 'prisma/ualumni/client';

export type Alumni = Omit<User, 'role'>;
