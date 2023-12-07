import {
  JobOfferTechnicalSkill,
  JobOffer as PrismaJobOffer,
} from '@prisma/client';

export type JobOffer = PrismaJobOffer & {
  technicalSkills: Omit<JobOfferTechnicalSkill, 'jobOfferId'>[];
};
