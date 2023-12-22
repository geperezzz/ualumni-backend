import { HttpStatus } from "@nestjs/common"

export type MessageResponseDto = {
  statusCode: HttpStatus,
  message: string,
}