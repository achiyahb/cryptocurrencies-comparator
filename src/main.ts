import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet());
	app.enableCors();
	const configService = app.get<ConfigService>(ConfigService);
	const options = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('Cryptocurrencies Comparator')
		.setDescription('An API that return real time price of cryptocurrencies')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('docs', app, document, {
		swaggerOptions: { defaultModelsExpandDepth: -1 },
	});
	await app.listen(configService.get('app.port'));
}
bootstrap();
