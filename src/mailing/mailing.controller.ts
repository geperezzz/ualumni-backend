import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('mailing')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @Get()
  @SessionNotRequired()
  @Allowed('all')
  async send(  ) {
    try {
      let sentEmail =
        await this.mailingService.sendResume('alumniEmail','companyEmail');

      return {
        statusCode: HttpStatus.CREATED
      };
    } catch (error) {
      console.log(error)
    }
  }
}
