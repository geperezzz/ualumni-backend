import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreatePortfolioItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  sourceLink: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
