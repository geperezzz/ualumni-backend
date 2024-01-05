import { Transaction } from '../transaction.type';

export async function seedDb(transaction: Transaction): Promise<void> {
  console.log('Seeding the UCAB database...');
  await seedCareers(transaction);
}

async function seedCareers(transaction: Transaction): Promise<void> {
  console.log('  ➥ Seeding careers...');

  await transaction.career.createMany({
    skipDuplicates: true,
    data: [
      // Facultad de Ciencias Económicas y Sociales
      { name: 'Administración de Empresas' },
      { name: 'Contaduría Pública' },
      { name: 'Relaciones Industriales' },

      // Facultad de Derecho
      { name: 'Derecho' },

      // Facultad de Humanidades y Educación
      { name: 'Comunicación Social' },
      { name: 'Educación: Mención Ciencias Sociales' },
      { name: 'Educación: Mención Integral' },
      { name: 'Educación: Mención Inicial' },
      { name: 'Educación: Mención Física y Matemática' },

      // Facultad de Ingeniería
      { name: 'Ingeniería Civil' },
      { name: 'Ingeniería Industrial' },
      { name: 'Ingeniería Informática' },
    ],
  });
}