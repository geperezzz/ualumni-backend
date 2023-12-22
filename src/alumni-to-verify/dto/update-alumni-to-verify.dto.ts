import { PartialType } from '@nestjs/swagger';
import { CreateAlumniToVerifyDto } from './create-alumni-to-verify.dto';

export class UpdateAlumniToVerifyDto extends PartialType(CreateAlumniToVerifyDto) {}
