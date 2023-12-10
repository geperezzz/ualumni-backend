import { Expose } from 'class-transformer';
import { CiapCourse } from 'src/ciap-courses/entities/ciap-course.entity';
import {
  HigherEducationStudy,
  IndustryOfInterest,
  PortfolioItem,
  PositionOfInterest,
  ResumeCiapCourse,
  ResumeLanguage,
  ResumeSoftSkill,
  ResumeTechnicalSkill,
} from '@prisma/client';

export class ResumeDto {
  @Expose() ownerEmail: string;
  @Expose() numberOfDownloads: number;
  @Expose() isVisible: boolean;
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
}
