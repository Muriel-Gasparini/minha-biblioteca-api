import { Migration } from '@mikro-orm/migrations';

export class Migration20241015021657 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "livro" ("id" serial primary key, "titulo" varchar(255) not null, "autor" varchar(255) not null, "ano_publicacao" int not null, "genero" varchar(255) not null, "status_leitura" text check ("status_leitura" in ('lido', 'nao lido')) not null default 'nao lido');`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "livro" cascade;`);
  }
}
