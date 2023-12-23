import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/ualumni/client';

@Injectable()
export class UalumniDbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
