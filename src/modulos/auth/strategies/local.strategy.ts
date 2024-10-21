import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Usuario } from 'src/modulos/usuarios/entities/usuario.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'senha' });
  }

  async validate(
    email: string,
    senha: string,
  ): Promise<Omit<Usuario, 'senha'>> {
    const user = await this.authService.validateUser(email, senha);
    if (!user) {
      throw new BadRequestException('Email ou senha inválidos');
    }
    return user;
  }
}
