import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from './entities/livro.entity';
import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LivroQueryParamsDto } from './dto/livro-query-params.dto';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: EntityRepository<Livro>,
    private readonly em: EntityManager,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createLivroDto: CreateLivroDto, usuarioId: number) {
    const usuario = await this.usuariosService.findOneById(usuarioId);
    const livro = this.em.create(Livro, { ...createLivroDto, usuario });
    await this.em.persistAndFlush(livro);
  }

  async findAll(usuarioId: number, params?: LivroQueryParamsDto) {
    const filters: FilterQuery<Livro> = { usuario: usuarioId };
    if (params?.search) {
      filters.$or = [
        { titulo: { $ilike: `%${params.search}%` } },
        { autor: { $ilike: `%${params.search}%` } },
      ];
    }
    return this.livroRepository.find(filters, { orderBy: { id: 'DESC' } });
  }

  async findOne(id: number, usuarioId: number) {
    const livro = await this.em.findOne(Livro, { id, usuario: usuarioId });
    if (!livro) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }
    return livro;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto, usuarioId: number) {
    const livro = await this.findOne(id, usuarioId);
    this.em.assign(livro, updateLivroDto);
    await this.em.flush();
  }

  async remove(id: number, usuarioId: number): Promise<void> {
    const livro = await this.findOne(id, usuarioId);
    await this.em.removeAndFlush(livro);
  }
}
