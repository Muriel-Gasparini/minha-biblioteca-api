import { PartialType } from '@nestjs/swagger';
import { CreateLivroDto } from './create-livro.dto';

export class UpdateLivroDto extends PartialType(CreateLivroDto) {}
