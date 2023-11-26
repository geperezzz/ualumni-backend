import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';

export class CreateResumeSoftSkillDto {
  @IsNotEmpty()
  @IsEmail()
  resumeOwnerEmail: string;

  @IsNotEmpty()
  @IsString()
  skillName: string;
  
  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;

  //     skill            SoftSkill @relation(fields: [skillName], references: [name])
  //     resume           Resume    @relation(fields: [resumeOwnerEmail], references: [ownerEmail])
  //   @@id([resumeOwnerEmail, skillName])
}
