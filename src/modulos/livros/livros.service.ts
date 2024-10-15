import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from './entities/livro.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: EntityRepository<Livro>,
    private readonly em: EntityManager,
  ) {}

  async create(createLivroDto: CreateLivroDto) {
    const livro = this.em.create(Livro, createLivroDto);
    await this.em.persistAndFlush(livro);
  }

  async findAll() {
    return this.livroRepository.findAll();
  }

  async findOne(id: number) {
    const livro = await this.em.findOne(Livro, id);
    if (!livro) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }
    return livro;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    const livro = await this.findOne(id);
    this.em.assign(livro, updateLivroDto);
    await this.em.flush();
  }

  async remove(id: number): Promise<void> {
    const livro = await this.findOne(id);
    await this.em.removeAndFlush(livro);
  }
}
