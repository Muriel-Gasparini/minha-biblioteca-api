import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    senha: string,
  ): Promise<Omit<Usuario, 'senha'> | null> {
    const user = await this.usuariosService.findOneByEmail(email);
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (user && senhaCorreta) {
      delete user.senha;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
