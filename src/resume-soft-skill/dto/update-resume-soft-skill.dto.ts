import { IsOptional, IsString, IsBoolean, MaxLength, Matches } from 'class-validator';

export class UpdateResumeSoftSkillDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message:
      'Skillname can contain letters, accents, numbers, special characters, and spaces',
  })
  skillName: string;

  @IsOptional()
  @IsBoolean()
  isVisible: boolean;


}