import { User } from '@prisma/client';

export type Alumni = Omit<User, 'role'>;
