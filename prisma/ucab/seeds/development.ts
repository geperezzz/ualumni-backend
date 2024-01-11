import { Transaction } from '../transaction.type';
import { seedDb as seedDbForProduction } from './production';

export async function seedDb(transaction: Transaction): Promise<void> {
  // To save the effort of having to fill out the same tables.
  // However, this is only valid as long as there are no differences between
  // the end result of filling tables in production and development (such as
  // creating a career that only exists in production)
  await seedDbForProduction(transaction);
  await seedStudentsWithHypotheticalData(transaction);
}

async function seedStudentsWithHypotheticalData(transaction: Transaction): Promise<void> {
  await transaction.student.upsert({
    where: { email: 'geperez.21@est.ucab.edu.ve' },
    update: {},
    create: {
      email: 'geperez.21@est.ucab.edu.ve',
      names: 'Gabriel Enrique',
      surnames: 'Pérez Hernández',
      birthDate: new Date('2003-09-03'),
      address: 'Puerto Ordaz, Bolívar, Venezuela',
      enrolledCareers: {
        create: {
          careerName: 'Ingeniería Informática',
          graduationDate: new Date('2022-01-04'),
          status: 'FINISHED',
        }
      },
    },
  });
}