import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnicalSkillDto {
  @IsNotEmpty()
  @IsEmail()
  name: string;

  @IsNotEmpty()
  @IsString()
  categoryName: string;

  //@@id([resumeOwnerEmail, skillName, skillCategoryName])
}
