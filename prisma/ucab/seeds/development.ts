import { Transaction } from '../transaction.type';
import { seedDb as seedDbForProduction } from './production';

export async function seedDb(transaction: Transaction): Promise<void> {
  // To save the effort of having to fill out the same tables.
  // However, this is only valid as long as there are no differences between
  // the end result of filling tables in production and development (such as
  // creating a career that only exists in production)
  await seedDbForProduction(transaction);
}