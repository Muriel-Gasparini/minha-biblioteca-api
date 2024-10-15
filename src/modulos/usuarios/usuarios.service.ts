import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import {
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@mikro-orm/nestjs';
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: EntityRepository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, salt);
      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        senha: hashedPassword,
      });
      await this.usuarioRepository.insert(usuario);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException('Este usuário já existe');
      }
      throw new Error('Erro ao criar o usuário');
    }
  }

  async findOneByEmail(email: string) {
    return this.usuarioRepository.findOne({ email });
  }
}
