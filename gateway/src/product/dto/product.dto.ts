import { ApiProperty } from '@nestjs/swagger';
import { CreateProductRequest } from '../product.pb';

export class CreateProductRequestDto implements CreateProductRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  price: number;
}
