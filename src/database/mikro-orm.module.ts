import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: ['./dist/entidades'],
        extensions: [Migrator],
        clientUrl: configService.get<string>('DATABASE_URL'),
        driver: PostgreSqlDriver,
        debug: configService.get<boolean>('DB_DEBUG', false),
      }),
    }),
  ],
})
export class DatabaseModule {}
