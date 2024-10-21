import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LivroQueryParamsDto } from './dto/livro-query-params.dto';

@ApiTags('Livros')
@ApiBearerAuth()
@Controller('livros')
@UseGuards(JwtAuthGuard)
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Verifique os dados enviados' })
  create(@Body() createLivroDto: CreateLivroDto, @Request() req) {
    return this.livrosService.create(createLivroDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os livros do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de livros' })
  findAll(@Request() req, @Query() query: LivroQueryParamsDto) {
    return this.livrosService.findAll(req.user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro encontrado' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.livrosService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  @ApiResponse({ status: 400, description: 'Verifique os dados enviados' })
  update(
    @Param('id') id: string,
    @Body() updateLivroDto: UpdateLivroDto,
    @Request() req,
  ) {
    return this.livrosService.update(+id, updateLivroDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  remove(@Param('id') id: string, @Request() req) {
    return this.livrosService.remove(+id, req.user.id);
  }
}
