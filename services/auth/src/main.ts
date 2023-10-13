import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './auth/filters/http-exception.filter';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from './auth/auth.pb';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';

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

  app.connectMicroservice({
    strategy: new GCPubSubServer({
      topic: `${process.env.NODE_ENV}_topic`,
      subscription: `auth_${process.env.NODE_ENV}_subscription`,
      noAck: true,
      client: {
        projectId: 'abimanyu_development',
        // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      },
    }),
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3002);
  await app.startAllMicroservices();
}

bootstrap();
