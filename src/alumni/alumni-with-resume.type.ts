import {
  Resume,
  Alumni as AlumniModel,
  CiapCourse,
  HigherEducationStudy,
  IndustryOfInterest,
  PortfolioItem,
  PositionOfInterest,
  Graduation,
  ResumeSoftSkill,
  ResumeTechnicalSkill,
  ResumeLanguage,
  ResumeCiapCourse,
} from '@prisma/client';
import { Alumni } from './alumni.type';

export type AlumniWithResume = Alumni &
  Omit<AlumniModel, 'email'> & {
    resume: Omit<Resume, 'ownerEmail'> & {
      ciapCourses: (CiapCourse &
        Omit<ResumeCiapCourse, 'resumeOwnerEmail' | 'courseId'>)[];
    } & {
      knownLanguages: Omit<ResumeLanguage, 'resumeOwnerEmail'>[];
    } & {
      technicalSkills: Omit<ResumeTechnicalSkill, 'resumeOwnerEmail'>[];
    } & {
      higherEducationStudies: Omit<HigherEducationStudy, 'resumeOwnerEmail'>[];
    } & {
      industriesOfInterest: Omit<IndustryOfInterest, 'resumeOwnerEmail'>[];
    } & {
      portfolio: Omit<PortfolioItem, 'resumeOwnerEmail'>[];
    } & {
      positionsOfInterest: Omit<PositionOfInterest, 'resumeOwnerEmail'>[];
    } & {
      softSkills: Omit<ResumeSoftSkill, 'resumeOwnerEmail'>[];
    };
  } & { careers: Omit<Graduation, 'alumniEmail'>[] };
