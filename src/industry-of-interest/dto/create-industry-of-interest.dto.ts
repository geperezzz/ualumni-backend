import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateIndustryOfInterestDto {
  @IsEmail()
  @IsNotEmpty()
  resumeOwnerEmail: string;

  @IsString()
  @IsNotEmpty()
  industryName: string;

  @IsBoolean()
  @IsNotEmpty()
  isVisible: boolean;
}
