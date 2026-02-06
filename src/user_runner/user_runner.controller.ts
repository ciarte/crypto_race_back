import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserRunnerService } from './user_runner.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

@Controller('user-runners')
export class UserRunnerController {
  constructor(private readonly userRunnerService: UserRunnerService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('claim-basic')
  async claimBasic(@Req() req: Request & { user: User }) {
    const user = req.user;
    return this.userRunnerService.claimBasicRunner(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserRunners(@Req() req: Request & { user: User }) {
    return this.userRunnerService.getUserRunners(req.user);
  }
}
