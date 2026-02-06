import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRunnerDto } from './create-user_runner.dto';

export class UpdateUserRunnerDto extends PartialType(CreateUserRunnerDto) {}
