import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Livro } from './entities/livro.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [MikroOrmModule.forFeature([Livro]), UsuariosModule],
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
