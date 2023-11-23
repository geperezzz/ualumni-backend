import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSoftSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
