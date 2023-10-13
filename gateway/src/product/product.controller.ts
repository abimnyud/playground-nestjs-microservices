import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindOneResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
  CreateProductResponse,
} from './product.pb';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductRequestDto } from './dto/product.dto';

@ApiTags('products/products')
@Controller('products')
export class ProductController implements OnModuleInit {
  private productServiceClient: ProductServiceClient;

  constructor(
    @Inject(PRODUCT_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  public onModuleInit(): void {
    this.productServiceClient =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() body: CreateProductRequestDto,
  ): Promise<Observable<CreateProductResponse>> {
    return this.productServiceClient.createProduct(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneResponse>> {
    return this.productServiceClient.findOne({ id });
  }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // async decreaseStock(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query('value', ParseIntPipe) value: number,
  // ): Promise<Observable<DecreaseStockResponse>> {
  //   return this.productServiceClient.decreaseStock({ id, value });
  // }
}
