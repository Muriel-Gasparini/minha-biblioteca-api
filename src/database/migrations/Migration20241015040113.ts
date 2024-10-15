import { Migration } from '@mikro-orm/migrations';

export class Migration20241015040113 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "livro" add column "usuario_id" int not null;`);
    this.addSql(
      `alter table "livro" add constraint "livro_usuario_id_foreign" foreign key ("usuario_id") references "usuario" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "livro" drop constraint "livro_usuario_id_foreign";`,
    );

    this.addSql(`alter table "livro" drop column "usuario_id";`);
  }
}
