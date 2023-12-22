import { Expose } from 'class-transformer';
import {
  HigherEducationStudy,
  IndustryOfInterest,
  PortfolioItem,
  PositionOfInterest,
  ResumeCiapCourse,
  ResumeLanguage,
  ResumeSoftSkill,
  ResumeTechnicalSkill,
  WorkExperience,
  CiapCourse
} from 'prisma/ualumni/client';
import { Resume } from '../resume.type';

export class ResumeDto implements Resume {
  @Expose() ownerId: string;
  @Expose() numberOfDownloads: number;
  @Expose() isVisible: boolean;
  @Expose() visibleSince: Date;
  @Expose() aboutMe: string;
  @Expose() ciapCourses: (CiapCourse &
    Omit<ResumeCiapCourse, 'resumeOwnerEmail' | 'courseId'>)[];
  @Expose() knownLanguages: Omit<ResumeLanguage, 'resumeOwnerEmail'>[];
  @Expose() technicalSkills: Omit<ResumeTechnicalSkill, 'resumeOwnerEmail'>[];
  @Expose() higherEducationStudies: Omit<
    HigherEducationStudy,
    'resumeOwnerEmail'
  >[];
  @Expose() industriesOfInterest: Omit<
    IndustryOfInterest,
    'resumeOwnerEmail'
  >[];
  @Expose() portfolio: Omit<PortfolioItem, 'resumeOwnerEmail'>[];
  @Expose() positionsOfInterest: Omit<PositionOfInterest, 'resumeOwnerEmail'>[];
  @Expose() softSkills: Omit<ResumeSoftSkill, 'resumeOwnerEmail'>[];
  @Expose() workExperiences: Omit<WorkExperience, 'resumeOwnerEmail'>[];
}
