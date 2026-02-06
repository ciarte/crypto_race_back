import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRunner } from './entities/user-runner.entity';
import { Runner } from 'src/user/entities/runner.entity';


@Injectable()
export class UserRunnerService {
  constructor(
    @InjectRepository(UserRunner)
    private userRunnerRepo: Repository<UserRunner>,

    @InjectRepository(Runner)
    private runnerRepo: Repository<Runner>,
  ) {}

async claimBasicRunner(user: User): Promise<UserRunner> {
    const basicRunner = await this.runnerRepo.findOne({ where: { price: 0 } });
    if (!basicRunner) throw new NotFoundException('Basic runner not found');

    const exists = await this.userRunnerRepo.findOne({
      where: { user: { id: user.id }, runner: { id: basicRunner.id } },
    });
    if (exists) return exists;

    const userRunner = this.userRunnerRepo.create({
      user,
      runner: basicRunner,
      level: 1,
      experience: 0,
      speed: basicRunner.baseSpeed,
      resistence: basicRunner.resistence,
      powerUpDuration: basicRunner.powerUpDuration,
      miningPower: basicRunner.miningPower,
      isActive: true,
    });

    return this.userRunnerRepo.save(userRunner);
  }

  async getUserRunners(user: User): Promise<UserRunner[]> {
  return this.userRunnerRepo.find({
    where: { user: { id: user.id } },
    relations: ['runner'],
  });
}

  async gainExperience(userId: number, runnerId: number, xp: number) {
        const userRunner = await this.userRunnerRepo.findOne({
      where: { user: { id: userId }, runner: { id: runnerId } },
      relations: ['runner'],
    });

    if (!userRunner) throw new NotFoundException('User runner not found');

        userRunner.experience += xp;

    return this.userRunnerRepo.save(userRunner);
  }
}