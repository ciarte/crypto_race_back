import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { StartRaceDto } from './dto/start-race.dto';
import { Player } from './entities/race.entity';
import { RaceEngineService } from './dto/engine/race-engine.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RaceService {
  constructor(
    private readonly raceEngine: RaceEngineService,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>, // <- aquí
  ) {}
  
  // private races: Player[] = [
  //   {
  //     "id": 1,
  //     "assetName": "Bob",
  //     "country": "Germany",
  //     "baseSpeed": 1.4,
  //     "resistance": 0.05,
  //     "powerUpDuration": 0.13,
  //     "miningPower": 1.2,
  //     "level": 2
  //   },
  //   {
  //     "id": 2,
  //     "assetName": "0_Forest_Ranger",
  //     "country": "Japon",
  //     "baseSpeed": 1.5,
  //     "resistance": 0.07,
  //     "powerUpDuration": 0.15,
  //     "miningPower": 1.2,
  //     "level": 2
  //   },
  //   {
  //     "id": 3,
  //     "assetName": "Bot",
  //     "country": "Italy",
  //     "baseSpeed": 1.6,
  //     "resistance": 0.05,
  //     "powerUpDuration": 0.20,
  //     "miningPower": 1.2,
  //     "level": 2
  //   },
  //   {
  //     "id": 4,
  //     "assetName": "0_Fallen_Angels",
  //     "country": "France",
  //     "baseSpeed": 1.3,
  //     "resistance": 0.07,
  //     "powerUpDuration": 0.10,
  //     "miningPower": 1.2,
  //     "level": 3
  //   }
  // ]

async create(dto: CreateRaceDto): Promise<Player> {
  const player = this.playerRepository.create({
    assetName: dto.assetName,
    country: dto.country,
    baseSpeed: dto.baseSpeed ?? 1,
    resistance: dto.resistance ?? 0.05,
    powerUpDuration: dto.powerUpDuration ?? 0.1,
    miningPower: 0,
    level: 1,
  });

  return await this.playerRepository.save(player);
}

async startRace(dto: StartRaceDto) {
    const player = await this.findOne(dto.playerRaceId);
    return this.raceEngine.startRace(player, dto.raceIndex, dto.botsCount);
  }

 async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

async findOne(id: number): Promise<Player> {
  const player = await this.playerRepository.findOne({ where: { id } });
  if (!player) throw new NotFoundException(`Player con Id: ${id} no encontrado`);
  return player;
}

async update(id: number, dto: UpdateRaceDto): Promise<Player> {
  const player = await this.findOne(id);
  Object.assign(player, dto);
  return await this.playerRepository.save(player);
}

async remove(id: number): Promise<{ message: string }> {
  const player = await this.findOne(id);
  await this.playerRepository.remove(player);
  return { message: `Player #${id} eliminado` };
}

}