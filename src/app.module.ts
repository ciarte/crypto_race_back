import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceModule } from './race/race.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Player } from './race/entities/race.entity';


@Module({
  imports: [
        TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',       // IP o host del servidor MySQL
      port: 3306,
      username: 'crypto_main',  // usuario MySQL
      password: 'pastasc0',  // contraseña MySQL
      database: 'crypto_race',     // nombre de la base de datos
      entities: [User, Player],   // todas tus entidades aquí
      synchronize: true,        // solo desarrollo; crea/actualiza tablas automáticamente
    }),RaceModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
