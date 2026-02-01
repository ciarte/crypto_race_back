import { Injectable } from '@nestjs/common';

@Injectable()
export class DifficultyService {

  getDifficultyMultiplier(playerLevel: number, raceIndex: number): number {
    const levelFactor = Math.log10(playerLevel + 1) * 0.2;
    const raceFactor = Math.log10(raceIndex + 1) * 0.4;

    const raw = 1 + levelFactor + raceFactor;
    return Math.min(Math.max(raw, 0.95), 1.4);
  }

  getNoise(): number {
    return 0.82 + Math.random() * 0.06;
  }
}
