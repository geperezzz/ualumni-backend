import {
  CiapCourse,
  HigherEducationStudy,
  IndustryOfInterest,
  PortfolioItem,
  PositionOfInterest,
  ResumeCiapCourse,
  ResumeLanguage,
  Resume as ResumeModel,
  ResumeSoftSkill,
  ResumeTechnicalSkill,
} from '../../prisma/ualumni/client';
import { WorkExperience } from '../../prisma/ualumni/client';

export type Resume = ResumeModel & {
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
} & {
  workExperiences: Omit<WorkExperience, 'resumeOwnerEmail'>[];
};
