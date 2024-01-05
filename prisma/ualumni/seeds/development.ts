import * as bcrypt from 'bcrypt';

import { Transaction as UalumniTransaction } from '../transaction.type';
import { Transaction as UcabTransaction } from '../../ucab/transaction.type';
import { seedDb as seedDbForProduction } from './production';

export async function seedDb(ualumniTransaction: UalumniTransaction, ucabTransaction: UcabTransaction): Promise<void> {
  // To save the effort of having to fill out the same tables.
  // However, this is only valid as long as there are no differences between
  // the end result of filling tables in production and development (such as
  // creating a user that only exists in production)
  await seedDbForProduction(ualumniTransaction, ucabTransaction);

  await seedAlumniWithHypotheticalData(ualumniTransaction);
}

async function seedAlumniWithHypotheticalData(ualumniTransaction: UalumniTransaction): Promise<void> {
  await ualumniTransaction.user.upsert({
    where: { email: 'geperez.21@est.ucab.edu.ve' },
    update: {},
    create: {
      email: 'geperez.21@est.ucab.edu.ve',
      password: await bcrypt.hash('geperez.21@est.ucab.edu.ve', await bcrypt.genSalt()),
      names: 'Gabriel Enrique',
      surnames: 'Pérez Hernández',
      role: 'ALUMNI',
      associatedAlumni: {
        create: {
          birthDate: new Date('2003-09-03'),
          address: 'Puerto Ordaz, Bolívar, Venezuela',
          graduations: {
            create: {
              graduationDate: new Date('2022-01-04'),
              careerName: 'Ingeniería Informática',
            },
          },
          resume: {
            create: {
              isVisible: true,
              aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              knownLanguages: {
                create: [
                  {
                    isVisible: true,
                    languageName: 'Español',
                    masteryLevel: 'C2',
                  },
                  {
                    isVisible: true,
                    languageName: 'Inglés',
                    masteryLevel: 'B2',
                  },
                ],
              },
              higherEducationStudies: {
                create: [ 
                  {
                    isVisible: true,
                    title: 'Investigación en Tecnologías Solares para Computación Eficiente',
                    institution: 'Instituto Tecnológico del Sol Radiante',
                    endDate: new Date('2022-05-23'),
                  },
                  {
                    isVisible: true,
                    title: 'Estudio de Algoritmos Avanzados para la Exploración de Planetas Lejanos',
                    institution: 'Universidad del Horizonte Azul',
                    endDate: new Date('2022-08-14'),
                  },
                ],
              },
              industriesOfInterest: {
                create: [
                  {
                    isVisible: true,
                    industryName: 'Desarrollo de Plataformas de Educación en Línea',
                  },
                  {
                    isVisible: true,
                    industryName: 'Desarrollo de Software para la Salud',
                  },
                ],
              },
            },
          },
        },
      },
    },
  });
}