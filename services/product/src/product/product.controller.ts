import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductRequestDto,
  FindManyRequestDto,
  FindOneRequestDto,
} from './dto/product.dto';
import {
  CreateProductResponse,
  DeleteRequest,
  DeleteResponse,
  FindManyResponse,
  FindOneResponse,
  PRODUCT_SERVICE_NAME,
  UpdateRequest,
  UpdateResponse,
} from './product.pb';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'Create')
  createProduct(
    payload: CreateProductRequestDto,
  ): Promise<CreateProductResponse> {
    return this.productService.create(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindOne')
  findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.productService.findOne(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindMany')
  findMany(payload: FindManyRequestDto): Promise<FindManyResponse> {
    return this.productService.findMany(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'Update')
  update(payload: UpdateRequest): Promise<UpdateResponse> {
    return this.productService.update(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'Delete')
  delete(payload: DeleteRequest): Promise<DeleteResponse> {
    return this.productService.delete(payload);
  }
}
