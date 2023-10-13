import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'nestjs_microservice_products',
      username: 'root',
      password: 'password',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
    }),
    ProductModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
