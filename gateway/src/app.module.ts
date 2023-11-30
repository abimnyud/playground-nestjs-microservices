import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    HealthCheckModule,
    ProductModule,
    AuthModule,
    RouterModule.register([
      { path: 'auth', module: AuthModule },
      {
        path: 'product',
        module: ProductModule,
      },
    ]),
  ],
})
export class AppModule {}
