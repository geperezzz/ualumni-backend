import { IsOptional, IsString, IsBoolean, MaxLength, Matches } from 'class-validator';

export class UpdateResumeSoftSkillDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'skillName must contain only letters and spaces',
  })
  skillName: string;

  @IsOptional()
  @IsBoolean()
  isVisible: boolean;


}