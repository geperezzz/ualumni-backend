import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const LanguageSchema = z.object({
  name: z.string(),
});

// class is required for using DTO as a type
export class CreateLanguageDto extends createZodDto(LanguageSchema) {}
