import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusLeitura } from '../entities/livro-status.enum';

export class CreateLivroDto {
  @ApiProperty({ description: 'Título do livro' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'Autor do livro' })
  @IsString()
  @IsNotEmpty()
  autor: string;

  @ApiProperty({ description: 'Ano de publicação do livro' })
  @IsNumber()
  @IsNotEmpty()
  anoPublicacao: number;

  @ApiProperty({ description: 'Gênero do livro' })
  @IsString()
  @IsNotEmpty()
  genero: string;

  @ApiProperty({
    description: 'Status de leitura do livro',
    enum: StatusLeitura,
  })
  @IsEnum(StatusLeitura)
  statusLeitura: StatusLeitura;
}
