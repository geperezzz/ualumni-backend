import { IsNotEmpty, IsString, IsBoolean, MaxLength, Matches } from 'class-validator';

export class CreateResumeSoftSkillDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message:
      'Skillname can contain letters, accents, numbers, special characters, and spaces',
  })
  skillName: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;

  constructor(skillName: string, isVisible: boolean) {
    this.skillName = skillName ? skillName.trim(): ' ';
    this.isVisible = isVisible;
  }
}