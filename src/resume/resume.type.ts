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
  WorkExperience
} from 'prisma/ualumni/client';

export type Resume = ResumeModel & {
  ciapCourses: (CiapCourse &
    Omit<ResumeCiapCourse, 'resumeOwnerId' | 'courseId'>)[];
} & {
  knownLanguages: Omit<ResumeLanguage, 'resumeOwnerId'>[];
} & {
  technicalSkills: Omit<ResumeTechnicalSkill, 'resumeOwnerId'>[];
} & {
  higherEducationStudies: Omit<HigherEducationStudy, 'resumeOwnerId'>[];
} & {
  industriesOfInterest: Omit<IndustryOfInterest, 'resumeOwnerId'>[];
} & {
  portfolio: Omit<PortfolioItem, 'resumeOwnerId'>[];
} & {
  positionsOfInterest: Omit<PositionOfInterest, 'resumeOwnerId'>[];
} & {
  softSkills: Omit<ResumeSoftSkill, 'resumeOwnerId'>[];
} & {
  workExperiences: Omit<WorkExperience, 'resumeOwnerId'>[];
};
