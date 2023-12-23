import {
  JobOfferTechnicalSkill,
  JobOffer as PrismaJobOffer,
} from '../../prisma/ualumni/client';

export type JobOffer = PrismaJobOffer & {
  technicalSkills: Omit<JobOfferTechnicalSkill, 'jobOfferId'>[];
};
