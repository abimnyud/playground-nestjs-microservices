/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface Error {
  status: number;
  name: string;
  message: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  data?: SignUpResponse_Data | undefined;
  error?: Error | undefined;
}

export interface SignUpResponse_Data {
  success: boolean;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  data?: SignInResponse_Data | undefined;
  error?: Error | undefined;
}

export interface SignInResponse_Data {
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  data?: ValidateResponse_Data | undefined;
  error?: Error | undefined;
}

export interface ValidateResponse_Data {
  userId: number;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  signUp(request: SignUpRequest): Observable<SignUpResponse>;

  signIn(request: SignInRequest): Observable<SignInResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  signUp(request: SignUpRequest): Promise<SignUpResponse> | Observable<SignUpResponse> | SignUpResponse;

  signIn(request: SignInRequest): Promise<SignInResponse> | Observable<SignInResponse> | SignInResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUp", "signIn", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
