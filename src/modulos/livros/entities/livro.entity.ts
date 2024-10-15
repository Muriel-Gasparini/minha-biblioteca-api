import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { StatusLeitura } from './livro-status.enum';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Livro {
  @PrimaryKey()
  id!: number;

  @Property()
  titulo!: string;

  @Property()
  autor!: string;

  @Property()
  anoPublicacao!: number;

  @Property()
  genero!: string;

  @Enum({
    items: () => StatusLeitura,
    default: StatusLeitura.NAO_LIDO,
  })
  statusLeitura!: StatusLeitura;

  @ManyToOne()
  usuario!: Usuario;
}
