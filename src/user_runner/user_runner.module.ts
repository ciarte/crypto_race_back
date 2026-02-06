import { Module } from '@nestjs/common';
import { UserRunnerService } from './user_runner.service';
import { UserRunnerController } from './user_runner.controller';

@Module({
  controllers: [UserRunnerController],
  providers: [UserRunnerService],
})
export class UserRunnerModule {}
