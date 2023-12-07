import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/ucab/client';

@Injectable()
export class UcabDbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
