import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LivroQueryParamsDto {
  @ApiPropertyOptional({ description: 'Pesquisa por título ou autor' })
  @IsOptional()
  @IsString()
  search?: string;
}
