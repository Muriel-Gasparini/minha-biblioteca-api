import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 200, description: 'Login efetuado com sucesso' })
  @ApiResponse({ status: 400, description: 'Email ou senha inválidos' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter informações do usuário logado' })
  @ApiResponse({ status: 200, description: 'Informações do usuário logado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getMe(@Request() req) {
    return req.user;
  }
}
