import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { envSchema } from './config/env.schema';
import { PricesModule } from './prices/prices.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { cryptoCompareConfig } from './config/crypto-compare.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object(envSchema),
      load: [appConfig, cryptoCompareConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
