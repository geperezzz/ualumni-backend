import { Alumni } from './alumni.type';
import { Resume } from '../resume/resume.type';

export type AlumniWithResume = Alumni & { resume: Omit<Resume, 'ownerEmail'> };
