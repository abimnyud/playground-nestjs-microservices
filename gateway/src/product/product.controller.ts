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
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import {
  FindOneResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
  CreateProductResponse,
  FindManyResponse,
  DeleteResponse,
  Product,
  UpdateResponse,
} from './product.pb';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateProductRequestDto } from './dto/product.dto';

@ApiTags('products')
@Controller()
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

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() body: CreateProductRequestDto,
  ): Promise<Observable<CreateProductResponse>> {
    return this.productServiceClient.create(body);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneResponse>> {
    return this.productServiceClient.findOne({ id });
  }

  @ApiQuery({ name: 'keyword', required: false })
  @Get()
  async findMany(
    @Query('keyword') keyword: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<FindManyResponse> {
    const { data, meta } = await firstValueFrom(
      this.productServiceClient.findMany({
        keyword,
        page,
        limit,
      }),
    );

    return { data: data ?? [], meta };
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Product,
  ): Promise<Observable<UpdateResponse>> {
    return this.productServiceClient.update({ data: { ...data, id } });
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<DeleteResponse>> {
    return this.productServiceClient.delete({ id });
  }
}
