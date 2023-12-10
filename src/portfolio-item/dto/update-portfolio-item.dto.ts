import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePortfolioItemDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  sourceLink?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
