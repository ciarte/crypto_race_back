import { Injectable } from '@nestjs/common';
import { DifficultyService } from '../difficulty/difficulty.service';
import { Player } from 'src/race/entities/race.entity';

@Injectable()
export class BotFactoryService {
  constructor(
    private readonly difficultyService: DifficultyService,
  ) { }

  createFromPlayer(player: Player, raceIndex: number): Player {
    const difficulty =
      this.difficultyService.getDifficultyMultiplier(
        player.level,
        raceIndex,
      );

    const noise = this.difficultyService.getNoise();

    const bot = new Player();
    bot.id = 0;
  //   const possibleBots = raceIndex % 10 === 0
  // ? ['Bot', '0_Forest_Ranger']
  // : ['Bot', 'Bob', '0_Forest_Ranger'];
    const possibleBots = ['Bot', '0_Forest_Ranger', 'Bob', '0_Fallen_Angels'];
    bot.assetName = possibleBots[Math.floor(Math.random() * possibleBots.length)];
    bot.country = player.country;

    bot.baseSpeed = Number(
      (player.baseSpeed * difficulty * noise * 0.85).toFixed(2),
    );

    bot.resistance = Number(
      (player.resistance * difficulty * 0.6 * noise).toFixed(2),
    );

    bot.powerUpDuration = Number(
      (player.powerUpDuration * (1 + (difficulty - 1) * 0.5)).toFixed(2),
    );

    bot.miningPower = player.miningPower;
    bot.level = possibleBots.indexOf(bot.assetName);

    return bot;
  }
}
