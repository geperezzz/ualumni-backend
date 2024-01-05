import * as bcrypt from 'bcrypt';

import { Transaction as UalumniTransaction } from '../transaction.type';
import { Transaction as UcabTransaction } from '../../ucab/transaction.type';

export async function seedDb(ualumniTransaction: UalumniTransaction, ucabTransaction: UcabTransaction): Promise<void> {
  console.log('Seeding the UAlumni database...');
  
  await seedSuperAdmin(ualumniTransaction);
  await seedCareers(ualumniTransaction, ucabTransaction);
  await seedContractTypes(ualumniTransaction);
  await seedSoftSkills(ualumniTransaction);
  await seedTechnicalSkillsAndTheirCategories(ualumniTransaction);
  await seedLanguages(ualumniTransaction);
}

async function seedSuperAdmin(ualumniTransaction: UalumniTransaction): Promise<void> {
  console.log('  ➥ Seeding super admin...');

  if (!process.env.SUPER_ADMIN_EMAIL) {
    throw new Error('Super admin credentials not available: SUPER_ADMIN_EMAIL environment variable is not set', {});
  }
  if (!process.env.SUPER_ADMIN_PASSWORD) {
    throw new Error('Super admin credentials not available: SUPER_ADMIN_PASSWORD environment variable is not set', {});
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, salt);
  await ualumniTransaction.user.upsert({
    where: { email: process.env.SUPER_ADMIN_EMAIL },
    update: {},
    create: {
      email: process.env.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      names: 'Super Admin',
      surnames: 'Super Admin',
      role: 'ADMIN',
    }
  });
}

async function seedCareers(ualumniTransaction: UalumniTransaction, ucabTransaction: UcabTransaction): Promise<void> {
  console.log('  ➥ Seeding careers...');
  
  const ucabCareers = await ucabTransaction.career.findMany();
  await ualumniTransaction.career.createMany({
    skipDuplicates: true,
    data: ucabCareers,
  });
}

async function seedContractTypes(ualumniTransaction: UalumniTransaction): Promise<void> {
  console.log('  ➥ Seeding contract types...');
  
  await ualumniTransaction.contractType.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Tiempo Completo' },
      { name: 'Medio Tiempo' },
    ],
  });
}

async function seedSoftSkills(ualumniTransaction: UalumniTransaction): Promise<void> {
  console.log('  ➥ Seeding contract types...');

  await ualumniTransaction.softSkill.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Comunicación efectiva' },
      { name: 'Trabajo en equipo' },
      { name: 'Resolución de problemas' },
      { name: 'Adaptabilidad' },
      { name: 'Gestión del tiempo' },
      { name: 'Empatía' },
      { name: 'Pensamiento crítico' },
      { name: 'Creatividad' },
      { name: 'Liderazgo' },
      { name: 'Negociación' },
      { name: 'Colaboración' },
      { name: 'Toma de decisiones' },
      { name: 'Flexibilidad' },
      { name: 'Innovación' },
      { name: 'Organización' },
      { name: 'Resiliencia' },
      { name: 'Cooperación' },
      { name: 'Respeto' },
      { name: 'Proactividad' },
      { name: 'Escucha activa' },
    ],
  });
}

async function seedTechnicalSkillsAndTheirCategories(ualumniTransaction: UalumniTransaction): Promise<void> {
  console.log('  ➥ Seeding technical skills and their categories...');

  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Lenguajes de Programación' },
    update: {},
    create: {
      name: 'Lenguajes de Programación',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: [
          { name: 'JavaScript' },
          { name: 'Python' },
          { name: 'Java' },
          { name: 'C++' },
          { name: 'Ruby' },
          { name: 'Rust' },
          { name: 'PHP' },
          { name: 'Kotlin' },
        ],
      },
    },
  });

  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Desarrollo Web' },
    update: {},
    create: {
      name: 'Desarrollo Web',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: [
          { name: 'HTML' },
          { name: 'CSS' },
          { name: 'JavaScript' },
          { name: 'Node.js' },
          { name: 'React' },
          { name: 'Django' },
          { name: 'Vue.js' },
          { name: 'Angular' },
          { name: 'PHP' },
        ],
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Frameworks de Java' },
    update: {},
    create: {
      name: 'Frameworks de Java',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: [
          { name: 'Spring Boot' },
          { name: 'Hibernate' },
        ],
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Control de Versiones' },
    update: {},
    create: {
      name: 'Control de Versiones',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: { name: 'Git' },
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Bases de Datos' },
    update: {},
    create: {
      name: 'Bases de Datos',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: [
          { name: 'SQL' },
          { name: 'MongoDB' },
          { name: 'PostgreSQL' },
          { name: 'MySQL' },
          { name: 'MariaDB' },
          { name: 'SQLite' },
        ],
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Ciencia de Datos' },
    update: {},
    create: {
      name: 'Ciencia de Datos',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: [
          { name: 'Machine Learning' },
          { name: 'TensorFlow' },
        ],
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Seguridad' },
    update: {},
    create: {
      name: 'Seguridad',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: { name: 'Ciberseguridad' },
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Infraestructura' },
    update: {},
    create: {
      name: 'Infraestructura',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: { name: 'Networking' },
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'DevOps' },
    update: {},
    create: {
      name: 'DevOps',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: { name: 'Docker' },
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Computación en la Nube' },
    update: {},
    create: {
      name: 'Computación en la Nube',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: [
          { name: 'AWS' },
          { name: 'Microsoft Azure' },
        ],
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Sistemas Operativos' },
    update: {},
    create: {
      name: 'Sistemas Operativos',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: { name: 'Linux' },
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Desarrollo de Videojuegos' },
    update: {},
    create: {
      name: 'Desarrollo de Videojuegos',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: { name: 'Unity' },
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Desarrollo de Aplicaciones Móviles' },
    update: {},
    create: {
      name: 'Desarrollo de Aplicaciones Móviles',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: [
          { name: 'Flutter' },
          { name: 'Swift' },
          { name: 'Kotlin' },
        ],
      },
    },
  });
  
  await ualumniTransaction.skillCategory.upsert({
    where: { name: 'Gestión de Proyectos' },
    update: {},
    create: {
      name: 'Gestión de Proyectos',
      relatedCareers: {
        connect: { name: 'Ingeniería Informática' },
      },
      technicalSkills: {
        create: { name: 'Metodología Ágil' },
      },
    },
  });
}

async function seedLanguages(ualumniTransaction: UalumniTransaction): Promise<void> {
  console.log('  ➥ Seeding languages...');

  await ualumniTransaction.language.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Español' },
      { name: 'Inglés' },
      { name: 'Portugués' },
      { name: 'Francés' },
      { name: 'Alemán' },
      { name: 'Italiano' },
      { name: 'Ruso' },
      { name: 'Chino Mandarín' },
      { name: 'Hindi' },
      { name: 'Japonés' },
      { name: 'Coreano' },
      { name: 'Árabe' },
      { name: 'Turco' },
      { name: 'Vietnamita' },
      { name: 'Indonesio' },
    ],
  });
}