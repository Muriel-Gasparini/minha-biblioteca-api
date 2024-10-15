import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login.dto';

export class UpdateAuthDto extends PartialType(LoginAuthDto) {}
