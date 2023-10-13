import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './product/product.pb';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50053',
      package: protobufPackage,
      protoPath: join(__dirname + '../../../../_proto/product.proto'),
    },
  });

  app.connectMicroservice({
    strategy: new GCPubSubServer({
      topic: `${process.env.NODE_ENV}_topic`,
      subscription: `product_${process.env.NODE_ENV}_subscription`,
      noAck: true,
      client: {
        projectId: 'abimanyu_development',
        // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      },
    }),
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.listen(3001);
  app.startAllMicroservices();
}

bootstrap();
