import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ResumeService } from 'src/resume/resume.service';

@Injectable()
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
}
