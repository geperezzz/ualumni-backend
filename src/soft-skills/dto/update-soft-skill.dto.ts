import { IsOptional, IsString } from 'class-validator';

export class UpdateSoftSkillDto {
  @IsString()
  @IsOptional()
  name?: string;
}
