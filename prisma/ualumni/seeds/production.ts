import * as bcrypt from 'bcrypt';

import { Transaction as UalumniTransaction } from '../transaction.type';
import { Transaction as UcabTransaction } from '../../ucab/transaction.type';

export async function seedDb(ualumniTransaction: UalumniTransaction, ucabTransaction: UcabTransaction): Promise<void> {
  console.log('Seeding the UAlumni database...');
  
  await seedSuperAdmin(ualumniTransaction);
  await seedCareers(ualumniTransaction, ucabTransaction);
  await seedContractTypes(ualumniTransaction);
  await seedSoftSkills(ualumniTransaction);
  await seedTechnicalSkillsCategories(ualumniTransaction);
  await seedTechnicalSkills(ualumniTransaction);
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

async function seedTechnicalSkillsCategories(ualumniTransaction: UalumniTransaction): Promise<void> {
  console.log('  ➥ Seeding technical skills categories...');

  await ualumniTransaction.skillCategory.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Lenguajes de Programación' },
      { name: 'Desarrollo Web' },
      { name: 'Frameworks de Java' },
      { name: 'Control de Versiones' },
      { name: 'Bases de Datos' },
      { name: 'Ciencia de Datos' },
      { name: 'Seguridad' },
      { name: 'Infraestructura' },
      { name: 'DevOps' },
      { name: 'Computación en la Nube' },
      { name: 'Sistemas Operativos' },
      { name: 'Desarrollo de Videojuegos' },
      { name: 'Desarrollo de Aplicaciones Móviles' },
      { name: 'Gestión de Proyectos' },
    ],
  });
}

async function seedTechnicalSkills(ualumniTransaction: UalumniTransaction): Promise<void> {
  console.log('  ➥ Seeding technical skills...');
  
  await ualumniTransaction.technicalSkill.createMany({
    skipDuplicates: true,
    data: [
      { categoryName: 'Lenguajes de Programación', name: 'JavaScript' },
      { categoryName: 'Lenguajes de Programación', name: 'Python' },
      { categoryName: 'Lenguajes de Programación', name: 'Java' },
      { categoryName: 'Lenguajes de Programación', name: 'C++' },
      { categoryName: 'Lenguajes de Programación', name: 'Ruby' },
      { categoryName: 'Lenguajes de Programación', name: 'Rust' },
      { categoryName: 'Lenguajes de Programación', name: 'PHP' },
      { categoryName: 'Lenguajes de Programación', name: 'Kotlin' },
      
      { categoryName: 'Desarrollo Web', name: 'HTML' },
      { categoryName: 'Desarrollo Web', name: 'CSS' },
      { categoryName: 'Desarrollo Web', name: 'JavaScript' },
      { categoryName: 'Desarrollo Web', name: 'Node.js' },
      { categoryName: 'Desarrollo Web', name: 'React' },
      { categoryName: 'Desarrollo Web', name: 'Django' },
      { categoryName: 'Desarrollo Web', name: 'Vue.js' },
      { categoryName: 'Desarrollo Web', name: 'Angular' },
      { categoryName: 'Desarrollo Web', name: 'PHP' },
      
      { categoryName: 'Frameworks de Java', name: 'Spring Boot' },
      { categoryName: 'Frameworks de Java', name: 'Hibernate' },
      
      { categoryName: 'Control de Versiones', name: 'Git' },
      
      { categoryName: 'Bases de Datos', name: 'SQL' },
      { categoryName: 'Bases de Datos', name: 'MongoDB' },
      { categoryName: 'Bases de Datos', name: 'PostgreSQL' },
      { categoryName: 'Bases de Datos', name: 'MySQL' },
      { categoryName: 'Bases de Datos', name: 'MariaDB' },
      { categoryName: 'Bases de Datos', name: 'SQLite' },
      
      { categoryName: 'Ciencia de Datos', name: 'Machine Learning' },
      { categoryName: 'Ciencia de Datos', name: 'TensorFlow' },
      
      { categoryName: 'Seguridad', name: 'Ciberseguridad' },
      
      { categoryName: 'Infraestructura', name: 'Networking' },
      
      { categoryName: 'DevOps', name: 'Docker' },
      
      { categoryName: 'Computación en la Nube', name: 'AWS' },
      { categoryName: 'Computación en la Nube', name: 'Microsoft Azure' },
      
      { categoryName: 'Sistemas Operativos', name: 'Linux' },
      
      { categoryName: 'Desarrollo de Videojuegos', name: 'Unity' },
      
      { categoryName: 'Desarrollo de Aplicaciones Móviles', name: 'Flutter' },
      { categoryName: 'Desarrollo de Aplicaciones Móviles', name: 'Swift' },
      { categoryName: 'Desarrollo de Aplicaciones Móviles', name: 'Kotlin' },
      
      { categoryName: 'Gestión de Proyectos', name: 'Metodología Ágil' }
    ],
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