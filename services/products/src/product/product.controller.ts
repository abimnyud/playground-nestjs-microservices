import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProductRequestDto, FindOneRequestDto } from './dto/product.dto';
import {
  CreateProductResponse,
  FindOneResponse,
  PRODUCT_SERVICE_NAME,
} from './product.pb';
import { ProductService } from './product.service';
import { CloudPubSubClientService } from 'src/shared/pub-sub.service';

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudPubSubClientService: CloudPubSubClientService,
  ) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  createProduct(
    payload: CreateProductRequestDto,
  ): Promise<CreateProductResponse> {
    return this.productService.createProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindOne')
  findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.productService.findOne(payload);
  }

  // @GrpcMethod(PRODUCT_SERVICE_NAME, 'DecreaseStock')
  // decreaseStock(payload: DecreaseStockRequest): Promise<DecreaseStockResponse> {
  //   return this.productService.decreaseStock(payload);
  // }
  @Get()
  helloWorld() {
    this.cloudPubSubClientService.client.emit('HELLO_WORLD', {
      message: 'Hello World!',
    });

    return 'Hello World';
  }
}
