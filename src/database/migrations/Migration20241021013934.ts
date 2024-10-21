import { Migration } from '@mikro-orm/migrations';

export class Migration20241021013934 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "livro" drop constraint if exists "livro_status_leitura_check";`,
    );

    this.addSql(
      `alter table "livro" add constraint "livro_status_leitura_check" check("status_leitura" in ('LIDO', 'NAO_LIDO'));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "livro" drop constraint if exists "livro_status_leitura_check";`,
    );

    this.addSql(
      `alter table "livro" add constraint "livro_status_leitura_check" check("status_leitura" in ('lido', 'nao lido'));`,
    );
  }
}
