import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnicalSkillDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
