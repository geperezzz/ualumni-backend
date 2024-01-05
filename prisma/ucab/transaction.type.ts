import { PrismaClient } from "./client";

export type Transaction = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];