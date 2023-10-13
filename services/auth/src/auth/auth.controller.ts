import { Controller, Inject } from '@nestjs/common';
import { EventPattern, GrpcMethod, Payload } from '@nestjs/microservices';
import {
  SignInRequestDto,
  SignUpRequestDto,
  ValidateRequestDto,
} from './dto/auth.dto';
import {
  AUTH_SERVICE_NAME,
  SignUpResponse,
  SignInResponse,
  ValidateResponse,
} from './auth.pb';
import { AuthService } from './services/auth.service';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly service: AuthService,
  ) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'SignUp')
  async signUp(payload: SignUpRequestDto): Promise<SignUpResponse> {
    return this.service.signUp(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'SignIn')
  async signIn(payload: SignInRequestDto): Promise<SignInResponse> {
    return this.service.signIn(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  async validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }

  @EventPattern('HELLO_WORLD')
  async eventHelloWorld(@Payload() data: any) {
    console.log(data);
  }
}
