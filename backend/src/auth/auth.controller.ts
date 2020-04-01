import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { classToPlain } from 'class-transformer';
import { RateLimit } from 'nestjs-rate-limiter';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { LoginDto, LoginResponseDto, TokenDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @RateLimit({ points: 20, duration: 60 })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  // @UseGuards(LocalAuthGuard)
  async refreshToken(@Body() tokenDto: TokenDto): Promise<TokenDto> {
    return this.authService.refreshToken(tokenDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(): Promise<string> {
    return 'Logged out.';
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: any): Promise<User> {
    const user = await this.userService.findOneByEmail(req.user.email);
    return classToPlain(user) as User;
  }
}
