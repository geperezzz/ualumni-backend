import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ResumeService } from 'src/resume/resume.service';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { UcabDbService } from 'src/ucab-db/ucab-db.service';

@Injectable()
export class MailingService {
  constructor(
    @Inject(forwardRef(() => ResumeService))
    private resumeService: ResumeService,
    private mailerService: MailerService,
    private ualumniDBService: UalumniDbService,
    private ucabDBService: UcabDbService
  ) {}

  async sendResume(alumniEmail: string, jobOfferId: string) {
    const alumni = await this.ualumniDBService.user.findUnique({
      where: { email: alumniEmail },
    });
    const jobOffer = await this.ualumniDBService.jobOffer.findUnique({
      where: { id: jobOfferId },
    });
    const name = `${alumni?.names.split(' ')[0]} ${alumni?.surnames.split(
      ' ',
    )[0]}`;

    const resume = await this.resumeService.exportAsPdf('b@b.bb');

    try {
      await this.mailerService.sendMail({
        to: jobOffer?.companyEmail,
        subject: `Currículum ${alumni?.names} ${alumni?.surnames} - ${jobOffer?.position}`,
        template: './send-resume', 
        context: {
          alumni: name,
          position: jobOffer?.position,
        },
        attachments: [
          { filename: `Currículum ${name}.pdf`, content: resume },
          {
            filename: 'logo.jpg',
            path: __dirname + '/templates/images/logo.png',
            cid: 'logo',
          },
          {
            filename: 'instagram.jpg',
            path: __dirname + '/templates/images/instagram.png',
            cid: 'instagram',
          },
        ],
      });
    } catch (error) {
      console.log('Error sending email: ', error);
    }
  }

  async sendVerification(alumniEmail: string, token: string) {
    const alumni = await this.ucabDBService.student.findUnique({
      where: { email: alumniEmail },
    });
    const name = `${alumni?.names.split(' ')[0]} ${alumni?.surnames.split(
      ' ',
    )[0]}`;

    const link = `http://localhost:3000/auth/verify-registration?token=${token}&email=${alumniEmail}` // probablemente deba ser un link del front pero shh

    try {
      await this.mailerService.sendMail({
        to: alumniEmail,
        subject: `Verificación  UAlumni - ${name}`,
        template: './email-verification', 
        context: {
          alumni: name,
          token,
          link,
        },
        attachments: [
          {
            filename: 'logo.jpg',
            path: __dirname + '/templates/images/logo.png',
            cid: 'logo',
          },
          {
            filename: 'instagram.jpg',
            path: __dirname + '/templates/images/instagram.png',
            cid: 'instagram',
          },
        ],
      });
    } catch (error) {
      console.log('Error sending email: ', error);
    }
  }
  
  async sendResumeVisibilityReminder(alumniEmail: string) {
    const alumni = await this.ucabDBService.student.findUnique({
      where: { email: alumniEmail },
    });
    const name = `${alumni?.names.split(' ')[0]} ${alumni?.surnames.split(
      ' ',
    )[0]}`;

    const link = `http://localhost:3000/auth/login` // homepage UAlumni

    try {
      await this.mailerService.sendMail({
        to: alumniEmail,
        subject: `Renovación de Visibilidad de Currículum UAlumni - ${name}`,
        template: './resume-reminder', 
        context: {
          alumni: name,
          link,
        },
        attachments: [
          {
            filename: 'logo.jpg',
            path: __dirname + '/templates/images/logo.png',
            cid: 'logo',
          },
          {
            filename: 'instagram.jpg',
            path: __dirname + '/templates/images/instagram.png',
            cid: 'instagram',
          },
        ],
      });
    } catch (error) {
      console.log('Error sending email: ', error);
    }
  }
}
