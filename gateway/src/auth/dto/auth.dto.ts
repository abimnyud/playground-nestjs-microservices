import { ApiProperty } from '@nestjs/swagger';
import { SignInRequest, SignUpRequest, ValidateRequest } from '../auth.pb';

export class SignInRequestDto implements SignInRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class SignUpRequestDto implements SignUpRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  token: string;
}
