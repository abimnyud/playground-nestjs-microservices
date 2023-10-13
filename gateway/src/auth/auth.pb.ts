import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface ResponsePayload {
  status: number;
  error: string[];
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse extends ResponsePayload {}

export interface SignInRequest extends SignUpRequest {}

export interface SignInResponse extends SignUpResponse {
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse extends ResponsePayload {
  userId: number;
}

export const AUTH_PACKAGE_NAME = 'auth';
export const AUTH_SERVICE_NAME = 'AuthService';

export interface AuthServiceClient {
  signUp(request: SignUpRequest): Observable<SignUpResponse>;

  signIn(request: SignInRequest): Observable<SignInResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}
