import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { StartRaceDto } from './dto/start-race.dto';
import { Player } from './entities/race.entity';
import { RaceEngineService } from './dto/engine/race-engine.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRunner } from 'src/user_runner/entities/user-runner.entity';
import { Runner } from 'src/user/entities/runner.entity';

@Injectable()
export class RaceService {
  constructor(
    private readonly raceEngine: RaceEngineService,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(UserRunner)
    private readonly userRunnerRepo: Repository<UserRunner>,

    @InjectRepository(Runner)
    private readonly runnerRepo: Repository<Runner>,
  ) { }

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

  async getAvailableRunners(user: User) {
    const userRunners = await this.userRunnerRepo.find({ where: { user: { id: user.id } } });
    const ownedIds = userRunners.map(ur => ur.runner.id);

    return this.runnerRepo.find({
      where: { id: Not(In(ownedIds)) },
    });
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