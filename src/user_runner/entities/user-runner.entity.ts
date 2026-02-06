import { Runner } from 'src/user/entities/runner.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity('user_runners')
export class UserRunner {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.runners)
  user!: User;

  @ManyToOne(() => Runner)
  runner!: Runner;

  @Column({ default: 1 })
  level!: number;

  @Column({ default: 0 })
  experience!: number;

 // stats dinámicas, que cambian con upgrades
  @Column({ type: 'float', default: 1 })
  speed!: number;

  @Column({ type: 'float', default: 1 })
  resistence!: number;

  @Column({ type: 'float', default: 1 })
  powerUpDuration!: number;

  @Column({ type: 'float', default: 1 })
  miningPower!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}