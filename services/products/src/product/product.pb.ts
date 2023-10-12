import { Observable } from 'rxjs';

export const protobufPackage = 'product';

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}

export interface CreateProductRequest extends Omit<Product, 'id'> {}

export interface CreateProductResponse {
  status: number;
  error: string[];
  id: number;
}

export interface FindOneRequest {
  id: number;
}

export interface FindOneResponse {
  status: number;
  error: string[];
  data: Product;
}

export const PRODUCT_PACKAGE_NAME = 'product';
export const PRODUCT_SERVICE_NAME = 'ProductService';

export interface ProductServiceClient {
  createProduct(
    request: CreateProductRequest,
  ): Observable<CreateProductResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;
}
