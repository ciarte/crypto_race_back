import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { RaceEngineService } from './dto/engine/race-engine.service';
import { BotFactoryService } from './dto/bots/bot_factory.service';
import { DifficultyService } from './dto/difficulty/difficulty.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/race.entity';

@Module({
  controllers: [RaceController],
  providers: [RaceService,
    RaceEngineService,
    BotFactoryService,
    DifficultyService,],
    imports: [TypeOrmModule.forFeature([Player])],
})
export class RaceModule { }
