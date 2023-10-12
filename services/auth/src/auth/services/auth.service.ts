import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import {
  SignUpRequestDto,
  SignInRequestDto,
  ValidateRequestDto,
} from '../dto/auth.dto';
import { Auth } from '../auth.entity';
import { SignInResponse, SignUpResponse, ValidateResponse } from '../auth.pb';

@Injectable()
export class AuthService {
  @InjectRepository(Auth)
  private readonly repository: Repository<Auth>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async signUp({ email, password }: SignUpRequestDto): Promise<SignUpResponse> {
    let auth: Auth = await this.repository.findOne({ where: { email } });

    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['E-mail already exists'] };
    }

    auth = new Auth();

    auth.email = email;
    auth.password = this.jwtService.encodePassword(password);

    await this.repository.save(auth);

    return { status: HttpStatus.CREATED, error: null };
  }

  async signIn({ email, password }: SignInRequestDto): Promise<SignInResponse> {
    const auth: Auth = await this.repository.findOne({ where: { email } });

    if (!auth) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-mail not found'],
        token: null,
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      password,
      auth.password,
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Wrong password'],
        token: null,
      };
    }

    const token: string = this.jwtService.generateToken(auth);

    return { token, status: HttpStatus.OK, error: null };
  }

  async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: Auth = await this.jwtService.verify(token);

    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Invalid token'],
        userId: null,
      };
    }

    const auth: Auth = await this.jwtService.validateUser(decoded);

    if (!auth) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }
}