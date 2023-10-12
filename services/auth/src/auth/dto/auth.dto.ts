import { IsEmail, IsString, MinLength } from 'class-validator';
import { SignInRequest, SignUpRequest, ValidateRequest } from '../auth.pb';

export class SignInRequestDto implements SignInRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class SignUpRequestDto implements SignUpRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  public readonly token: string;
}
