import { IsOptional, IsEmail, IsString, IsBoolean } from 'class-validator';

export class UpdateResumeSoftSkillDto {
  @IsOptional()
  @IsEmail()
  resumeOwnerEmail?: string;

  @IsOptional()
  @IsString()
  skillName?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  //     skill            SoftSkill @relation(fields: [skillName], references: [name])
  //     resume           Resume    @relation(fields: [resumeOwnerEmail], references: [ownerEmail])
  //   @@id([resumeOwnerEmail, skillName])
}
