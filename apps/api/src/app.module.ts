import { Module } from '@nestjs/common';

import { BondModule } from './bond/bond.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [BondModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
