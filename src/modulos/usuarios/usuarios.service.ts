import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuariosService {
  constructor(private readonly usuarioRepository: EntityRepository<Usuario>) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, salt);
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: hashedPassword,
    });
    return await this.usuarioRepository.insert(usuario);
  }

  async findOneByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ email });
  }
}
