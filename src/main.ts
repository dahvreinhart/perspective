import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT, SERVICE_NAME } from './app.environment';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(SERVICE_NAME)
  app.useGlobalInterceptors(new LoggingInterceptor);

  await app.listen(PORT, () => {
    logger.log(`Application is running successfully at http://localhost:${PORT}`);
  });
}

bootstrap();
