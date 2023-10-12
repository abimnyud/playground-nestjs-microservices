import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HealthCheckModule, ProductModule, AuthModule],
})
export class AppModule {}
