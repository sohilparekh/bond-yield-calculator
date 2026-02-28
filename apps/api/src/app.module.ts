import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';
import { BondModule } from './bond/bond.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [LinksModule, BondModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
