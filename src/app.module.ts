import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceModule } from './race/race.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      // 🔑 CLAVE ABSOLUTA
      entities: [__dirname + '/**/*.entity{.js,.ts}'],

      synchronize: true,

      ssl: {
        rejectUnauthorized: false,
      },

      logging: true,
    }),

    RaceModule,
    UserModule,
  ],
})
export class AppModule { }