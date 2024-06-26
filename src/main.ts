import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NODE_ENV, PORT, SERVICE_NAME } from './app.environment';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Setup response error logging
    app.useGlobalInterceptors(new LoggingInterceptor());

    // Setup API documentation
    if (NODE_ENV !== 'production') {
        const config = new DocumentBuilder()
        .setTitle('Perspective User Web Application Work Sample')
        .setDescription('A small web application for interacting with users.')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    }

    const logger = new Logger(SERVICE_NAME);
    await app.listen(PORT, () => {
        logger.log(`Application is running successfully at http://localhost:${PORT}`);
    });
}

bootstrap();
