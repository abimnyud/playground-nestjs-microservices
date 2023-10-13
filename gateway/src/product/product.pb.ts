/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface CreateProductRequest {
  name: string;
  stock: number;
  price: number;
}

export interface CreateProductResponse {
  status: number;
  error: string[];
  id: number;
}

export interface FindOneData {
  id: number;
  name: string;
  stock: number;
  price: number;
}

export interface FindOneRequest {
  id: number;
}

export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;

  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createProduct", "findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
