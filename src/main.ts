import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  const configService = app.get<ConfigService>(ConfigService);
  console.log(configService.get('app.port'));
  await app.listen(configService.get('app.port'));
}
bootstrap();
