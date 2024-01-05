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
      { name: 'Sociología' },
      { name: 'Economía' },
      { name: 'Economía' },

      // Facultad de Derecho
      { name: 'Derecho' },

      // Facultad de Humanidades y Educación
      { name: 'Letras' },
      { name: 'Psicología' },
      { name: 'Filosofía' },
      { name: 'Comunicación Social' },
      { name: 'Comunicación Social' },
      { name: 'Educación: Mención Biología y Química' },
      { name: 'Educación: Mención Ciencias Pedagógicas' },
      { name: 'Educación: Mención Ciencias Sociales' },
      { name: 'Educación: Mención Filosofía' },
      { name: 'Educación: Mención Física y Matemática' },
      { name: 'Educación: Mención Integral' },
      { name: 'Educación: Mención Inicial' },
      { name: 'Educación: Mención Idiomas Modernos-Inglés' },
      { name: 'Programa Especial de Licenciatura en Educación' },

      // Facultad de Ingeniería
      { name: 'Ingeniería en Telecomunicaciones' },
      { name: 'Ingeniería Civil' },
      { name: 'Ingeniería Industrial' },
      { name: 'Ingeniería Informática' },
      { name: 'Arquitectura' },

      // Facultad de Teología
      { name: 'Teología' },
    ],
  });
}