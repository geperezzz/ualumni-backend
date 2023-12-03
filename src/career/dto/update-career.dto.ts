import { IsOptional, IsString } from 'class-validator';

export class UpdateCareerDto {
  @IsString()
  @IsOptional()
  name?: string;
}
