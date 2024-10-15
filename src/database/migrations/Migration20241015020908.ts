import { Migration } from '@mikro-orm/migrations';

export class Migration20241015020908 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "usuario" ("id" serial primary key, "nome" varchar(255) not null, "email" varchar(255) not null, "senha" varchar(255) not null, "criado_em" date not null default now(), "atualizado_em" date not null);`,
    );
    this.addSql(
      `alter table "usuario" add constraint "usuario_email_unique" unique ("email");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "usuario" cascade;`);
  }
}
