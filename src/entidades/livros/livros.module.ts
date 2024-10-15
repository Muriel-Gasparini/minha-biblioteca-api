import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';

@Module({
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
