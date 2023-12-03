import { Resume } from '@prisma/client';
import { Alumni } from './alumni.type';

export type AlumniWithResume = Alumni & { resume: Omit<Resume, 'ownerEmail'> };
