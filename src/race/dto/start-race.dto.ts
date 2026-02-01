import { IsInt, Min, Max, IsPositive } from 'class-validator';

export class StartRaceDto {
  @IsInt()
  playerRaceId: number;

  @IsInt()
  @Min(1)
  @Max(3)
  botsCount: number;

  @IsInt()
  @IsPositive()
  raceIndex: number;
}