import { PartialType } from '@nestjs/mapped-types';
import { CreateRaceDto } from './create-race.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRaceDto extends PartialType(CreateRaceDto) {}
