import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceModule } from './race/race.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Player } from './race/entities/race.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Player],
      synchronize: true,
    }), RaceModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
