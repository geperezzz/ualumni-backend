import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateJobOfferTechnicalSkillDto {
  @IsOptional()
  @IsUUID()
  jobOfferId?: string;

  @IsOptional()
  @IsString()
  skillCategoryName?: string;

  @IsOptional()
  @IsString()
  skillName?: string;
}
