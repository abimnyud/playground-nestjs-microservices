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
      return {
        error: {
          status: HttpStatus.CONFLICT,
          name: 'CONFLICT',
          message: 'E-mail already exists',
        },
        data: null,
      };
    }

    auth = new Auth();

    auth.email = email;
    auth.password = this.jwtService.encodePassword(password);

    await this.repository.save(auth);

    return { data: { success: true }, error: null };
  }

  async signIn({ email, password }: SignInRequestDto): Promise<SignInResponse> {
    const auth: Auth = await this.repository.findOne({ where: { email } });

    if (!auth) {
      return {
        error: {
          status: HttpStatus.NOT_FOUND,
          name: 'NOT FOUND',
          message: 'E-mail not found',
        },
        data: null,
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      password,
      auth.password,
    );

    if (!isPasswordValid) {
      return {
        error: {
          status: HttpStatus.NOT_FOUND,
          name: 'NOT FOUND',
          message: 'Wrong password',
        },
        data: null,
      };
    }

    const token: string = this.jwtService.generateToken(auth);

    return { data: { token }, error: null };
  }

  async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: Auth = await this.jwtService.verify(token);

    if (!decoded) {
      return {
        error: {
          status: HttpStatus.FORBIDDEN,
          name: 'FORBIDDEN',
          message: 'Invalid token',
        },
        data: null,
      };
    }

    const auth: Auth = await this.jwtService.validateUser(decoded);

    if (!auth) {
      return {
        error: {
          status: HttpStatus.CONFLICT,
          name: 'NOT FOUND',
          message: 'User not found',
        },
        data: null,
      };
    }

    return { data: { userId: decoded.id }, error: null };
  }
}
