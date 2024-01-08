import { IsString, IsEmail, IsBoolean, IsOptional, MaxLength, Matches  } from 'class-validator';

export class UpdateResumeTechnicalSkillDto {
  @IsEmail()
  @IsOptional()
  resumeOwnerEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message:
      'SkillCategoryName can contain letters, accents, numbers, special characters, and spaces',
  })
  skillCategoryName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message:
      'SkillName can contain letters, accents, numbers, special characters, and spaces',
  })
  skillName: string;


  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;


}
