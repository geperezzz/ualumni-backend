import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobOfferTechnicalSkillDto {
  @IsNotEmpty()
  @IsString()
  skillCategoryName: string;

  @IsNotEmpty()
  @IsString()
  skillName: string;
}
