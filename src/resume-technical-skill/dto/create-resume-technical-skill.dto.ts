import { IsNotEmpty, IsString, IsBoolean, MaxLength, Matches } from 'class-validator';

export class CreateResumeTechnicalSkillDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'skillCategoryName must contain only letters and spaces',
  })
  skillCategoryName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'skillName must contain only letters and spaces',
  })
  skillName: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;

  constructor(skillName: string, skillCategoryName: string, isVisible: boolean) {
    this.skillName = skillName ? skillName.trim() : '';
    this.isVisible = isVisible;
    this.skillCategoryName = skillCategoryName ? skillCategoryName.trim() : '';
  }
}
