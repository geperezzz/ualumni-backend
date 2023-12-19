import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ResumeService } from 'src/resume/resume.service';

@Injectable()
export class MailingService {
  constructor(
    private mailerService: MailerService,
    private resumeService: ResumeService,
  ) {}

  async sendResume(user: string, to: string) {
    const resume = await this.resumeService.exportAsPdf('b@b.bb');
    const alumni = {
      name: 'Aurimart García',
    };
    const jobOffer = {
      position: 'Analista',
    };
    try {
      await this.mailerService.sendMail({
        to: 'aurimart.liliana@gmail.com',
        subject: `Currículum ${alumni.name} - ${jobOffer.position}`,
        template: './send-resume', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          alumni: alumni.name,
          position: jobOffer.position,
        },
        attachments: [
          { filename: `Currículum ${alumni.name}.pdf`, content: resume },
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

/*@Injectable()
export class MailingService {
  constructor(private readonly resumeService: ResumeService) {}
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ualumni.ucab@gmail.com',
      pass: 'bcxttknxiriovakz',
    },
  });

  async sendMail(to: string) {
    const resume = await this.resumeService.exportAsPdf('b@b.bb');
    const alumni = {
      name: 'Aurimart García',
    };
    const jobOffer = {
      position: 'Analista',
    };
    try {
      await this.transporter.sendMail({
        to: 'aurimart.liliana@gmail.com',
        subject: `Currículum ${alumni.name} - ${jobOffer.position}`,
        text: 'nam',
        attachments: [
          { filename: `Currículum ${alumni.name}.pdf`, content: resume },
        ],
      });
    } catch (error) {
      console.log('Error sending email: ', error);
    }
  }
}*/
