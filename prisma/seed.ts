import { seedDb as seedUalumniDbForProduction } from './ualumni/seeds/production';
import { seedDb as seedUalumniDbForDevelopment } from './ualumni/seeds/development';
import { Transaction as UalumniTransaction } from './ualumni/transaction.type';
import { PrismaClient as UalumniClient } from './ualumni/client';

import { seedDb as seedUcabDbForProduction } from './ucab/seeds/production';
import { seedDb as seedUcabDbForDevelopment } from './ucab/seeds/development';
import { Transaction as UcabTransaction } from './ucab/transaction.type';
import { PrismaClient as UcabClient } from './ucab/client';

main();

async function main(): Promise<void> {
  let seedUcabDb: (transaction: UcabTransaction) => Promise<void>;
  let seedUalumniDb: (ualumniTransaction: UalumniTransaction, ucabTransaction: UcabTransaction) => Promise<void>;

  switch (process.env.NODE_ENV) {
    case undefined:
      console.error('⚠ Cannot seed the databases without a specified environment: NODE_ENV environment variable not set');
      process.exit(1);
    case 'production':
      seedUcabDb = seedUcabDbForProduction;
      seedUalumniDb = seedUalumniDbForProduction;
      break;
    case 'development':
      seedUcabDb = seedUcabDbForDevelopment;
      seedUalumniDb = seedUalumniDbForDevelopment;
      break;
    default:
      console.error('⚠ Invalid environment. The allowed values for NODE_ENV are: "production", "development"');
      process.exit(1);
  }

  const ucab = new UcabClient();
  await ucab.$transaction(async (ucabTransaction) => {
    try {
      await seedUcabDb(ucabTransaction);
    } catch (error) {
      console.error('⚠ An error ocurred while seeding the UCAB database:', error);
      process.exit(1);
    }
    
    const ualumni = new UalumniClient();
    await ualumni.$transaction(async (ualumniTransaction) => {
      try {
        await seedUalumniDb(ualumniTransaction, ucabTransaction);
      } catch (error) {
        console.error('⚠ An error ocurred while seeding the UAlumni database:', error);
        process.exit(1);
      }
    });
  });
}

