import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { RaceService } from './race.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { StartRaceDto } from './dto/start-race.dto';
import { Player } from './entities/race.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) { }

  @Post('start')
  async startRace(@Body() dto: StartRaceDto): Promise<any> {
    return this.raceService.startRace(dto);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return this.raceService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('available')
  async getAvailableRunners(@Req() req: Request & { user: User }) {
    return this.raceService.getAvailableRunners(req.user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return this.raceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRaceDto: UpdateRaceDto): Promise<Player> {
    return this.raceService.update(id, updateRaceDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.raceService.remove(id);
  }

}