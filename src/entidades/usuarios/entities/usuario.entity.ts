import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Usuario {
  @PrimaryKey()
  id!: number;

  @Property()
  nome!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  senha!: string;

  @Property({ type: 'date', defaultRaw: 'now()' })
  criadoEm: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  atualizadoEm: Date = new Date();
}
