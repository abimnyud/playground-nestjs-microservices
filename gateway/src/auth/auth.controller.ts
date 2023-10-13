import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AuthServiceClient,
  SignUpResponse,
  AUTH_SERVICE_NAME,
  SignInResponse,
} from './auth.pb';
import { ApiTags } from '@nestjs/swagger';
import { SignInRequestDto, SignUpRequestDto } from './dto/auth.dto';

@ApiTags('auth/auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private authServiceClient: AuthServiceClient;

  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpcProxy,
  ) {}

  public onModuleInit(): void {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('sign-up')
  async signUp(
    @Body() body: SignUpRequestDto,
  ): Promise<Observable<SignUpResponse>> {
    return this.authServiceClient.signUp(body);
  }

  @Post('sign-in')
  async signIn(
    @Body() body: SignInRequestDto,
  ): Promise<Observable<SignInResponse>> {
    console.log('Sign In lewat API Gateway');

    return this.authServiceClient.signIn(body);
  }
}
