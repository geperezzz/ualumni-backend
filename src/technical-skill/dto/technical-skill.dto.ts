import { Expose } from 'class-transformer';

export class TechnicalSkillDto {
  @Expose()
  name: string;
}
