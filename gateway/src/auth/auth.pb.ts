/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  status: number;
  error: string[];
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export const AUTH_PACKAGE_NAME = 'auth';
export const AUTH_SERVICE_NAME = 'AuthService';

export interface AuthServiceClient {
  signUp(request: SignUpRequest): Observable<SignUpResponse>;

  signIn(request: SignInRequest): Observable<SignInResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  signUp(
    request: SignUpRequest,
  ): Promise<SignUpResponse> | Observable<SignUpResponse> | SignUpResponse;

  signIn(
    request: SignInRequest,
  ): Promise<SignInResponse> | Observable<SignInResponse> | SignInResponse;

  validate(
    request: ValidateRequest,
  ):
    | Promise<ValidateResponse>
    | Observable<ValidateResponse>
    | ValidateResponse;
}
