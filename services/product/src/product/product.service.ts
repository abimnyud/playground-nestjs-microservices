import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductRequestDto, FindOneRequestDto } from './dto/product.dto';
import {
  CreateProductResponse,
  DeleteRequest,
  DeleteResponse,
  FindManyRequest,
  FindManyResponse,
  FindOneResponse,
  UpdateRequest,
  UpdateResponse,
} from './product.pb';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOne({ id }: FindOneRequestDto): Promise<FindOneResponse> {
    const product: Product = await this.productRepository.findOneBy({ id });

    if (!product) {
      return {
        data: null,
        error: {
          status: HttpStatus.NOT_FOUND,
          name: 'Not Found',
          message: 'Product not found',
        },
      };
    }

    return { data: product, error: null };
  }

  async findMany({
    keyword,
    page,
    limit,
  }: FindManyRequest): Promise<FindManyResponse> {
    const qb = this.productRepository.createQueryBuilder('product');

    if (keyword) {
      qb.where('product.name LIKE :keyword', {
        keyword: `%${keyword.trim().toLowerCase()}%`,
      });
    }

    const [data = [], total] = await qb.getManyAndCount();

    return { data, meta: { total, page, limit } };
  }

  async create(
    payload: CreateProductRequestDto,
  ): Promise<CreateProductResponse> {
    const product: Product = new Product();

    product.name = payload.name;
    product.stock = payload.stock;
    product.price = payload.price;

    try {
      await this.productRepository.save(product);
    } catch (error: any) {
      return {
        data: null,
        error: {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          name: error.name,
          message: error.message,
        },
      };
    }

    return { data: { id: product.id }, error: null };
  }

  async delete({ id }: DeleteRequest): Promise<DeleteResponse> {
    try {
      await this.productRepository.delete({ id });
    } catch (error: any) {
      return {
        data: null,
        error: {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          name: error.name,
          message: error.message,
        },
      };
    }

    return { data: { id }, error: null };
  }

  async update({ data }: UpdateRequest): Promise<UpdateResponse> {
    try {
      await this.productRepository.update({ id: data.id }, data);

      const updatedData = await this.productRepository.findOneBy({
        id: data.id,
      });

      return { data: updatedData, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          name: error.name,
          message: error.message,
        },
      };
    }
  }
}
