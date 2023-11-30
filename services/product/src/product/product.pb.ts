/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}

export interface Error {
  status: number;
  name: string;
  message: string;
}

export interface CreateProductRequest {
  name: string;
  stock: number;
  price: number;
}

export interface CreateProductResponse {
  data?: CreateProductResponse_Data | undefined;
  error?: Error | undefined;
}

export interface CreateProductResponse_Data {
  id: number;
}

export interface FindOneRequest {
  id: number;
}

export interface FindOneResponse {
  data?: Product | undefined;
  error?: Error | undefined;
}

export interface FindManyRequest {
  keyword: string;
  page: number;
  limit: number;
}

export interface FindManyResponse {
  data: Product[];
  meta: FindManyResponse_Meta | undefined;
}

export interface FindManyResponse_Meta {
  total: number;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface UpdateRequest {
  data: Product | undefined;
}

export interface UpdateResponse {
  data?: Product | undefined;
  error?: Error | undefined;
}

export interface DeleteRequest {
  id: number;
}

export interface DeleteResponse {
  data: DeleteResponse_Data | undefined;
  error?: Error | undefined;
}

export interface DeleteResponse_Data {
  id: number;
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  create(request: CreateProductRequest): Observable<CreateProductResponse>;

  findMany(request: FindManyRequest): Observable<FindManyResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  update(request: UpdateRequest): Observable<UpdateResponse>;

  delete(request: DeleteRequest): Observable<DeleteResponse>;
}

export interface ProductServiceController {
  create(
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;

  findMany(request: FindManyRequest): Promise<FindManyResponse> | Observable<FindManyResponse> | FindManyResponse;

  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  update(request: UpdateRequest): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(request: DeleteRequest): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findMany", "findOne", "update", "delete"];
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
