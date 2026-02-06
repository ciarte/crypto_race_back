import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register( dto: RegisterDto) {
    const exists = await this.userService.findByEmail(dto.email);
       if (exists) {
      throw new BadRequestException('User already exists');
    }
      const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      email: dto.email,
      password: hash,
    });
    return this.buildSession(user);
  
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildSession(user);
  }

  private buildSession(user: User) {
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      userId: user.id,
      email: user.email,
      token,
    };
  }
}