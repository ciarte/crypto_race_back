import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRaceDto {
  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsNotEmpty()
  assetName!: string;

  @Type(() => Number)
  @IsNumber()
  baseSpeed!: number;

  @Type(() => Number)
  @IsNumber()
  resistance!: number;

  @Type(() => Number)
  @IsNumber()
  powerUpDuration!: number;
}
