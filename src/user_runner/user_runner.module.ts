import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRunnerService } from './user_runner.service';
import { UserRunnerController } from './user_runner.controller';
import { UserRunner } from './entities/user-runner.entity';
import { Runner } from 'src/user/entities/runner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRunner, Runner]),
  ],
  controllers: [UserRunnerController],
  providers: [UserRunnerService],
  exports: [UserRunnerService],
})
export class UserRunnerModule {}