import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePortfolioItemDto {
  @IsEmail()
  @IsOptional()
  resumeOwnerEmail?: string;

  @IsString()
  title: string;

  @IsString()
  sourceLink: string;

  @IsBoolean()
  isVisible: boolean;
}
