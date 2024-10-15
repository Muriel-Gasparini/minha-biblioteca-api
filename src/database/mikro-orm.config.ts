import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

const config: Options<PostgreSqlDriver> = {
  extensions: [Migrator],
  driver: PostgreSqlDriver,
};

export default config;
