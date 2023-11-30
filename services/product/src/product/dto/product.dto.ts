import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateProductRequest, FindOneRequest } from '../product.pb';

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  readonly id: number;
}

export class CreateProductRequestDto implements CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  readonly stock: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  readonly price: number;
}

export class FindManyRequestDto implements FindManyRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly keyword: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  readonly page: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  readonly limit: number;
}
