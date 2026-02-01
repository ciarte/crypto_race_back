import { Injectable } from '@nestjs/common';
import { BotFactoryService } from '../bots/bot_factory.service';
import { Player } from 'src/race/entities/race.entity';

const BOT_COUNT = 3;
@Injectable()
export class RaceEngineService {
    constructor(
        private readonly botFactory: BotFactoryService,
    ) { }

    startRace(player: Player, raceIndex: number, botsCount: number) {
        const bots = Array.from({ length: botsCount }, (_, i) =>
            this.botFactory.createFromPlayer(player, raceIndex + i),
        );
        return {
            player,
            bots,
        };
    }
}
