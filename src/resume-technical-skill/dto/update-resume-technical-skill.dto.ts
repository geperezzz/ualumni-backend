import { IsString, IsEmail, IsBoolean, IsOptional, MaxLength, Matches  } from 'class-validator';

export class UpdateResumeTechnicalSkillDto {
  @IsEmail()
  @IsOptional()
  resumeOwnerEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'skillCategoryName must contain only letters and spaces',
  })
  skillCategoryName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'skillName must contain only letters and spaces',
  })
  skillName: string;


  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;


}
