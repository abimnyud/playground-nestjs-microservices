import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './auth/filters/http-exception.filter';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from './auth/auth.pb';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: protobufPackage,
      protoPath: join(__dirname + '../../../../_proto/auth.proto'),
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3002);
  await app.startAllMicroservices();
}

bootstrap();
