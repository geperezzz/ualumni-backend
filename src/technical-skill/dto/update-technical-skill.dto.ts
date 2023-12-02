import { IsOptional, IsString } from 'class-validator';

export class UpdateTechnicalSkillDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;
}
