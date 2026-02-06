// player.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  assetName!: string;

  @Column({ nullable: true })
  country!: string;

  @Column({ type: 'float', default: 1 })
  baseSpeed!: number;

  @Column({ type: 'float', default: 1 })
  resistance!: number;

  @Column({ type: 'float', default: 1 })
  powerUpDuration!: number;

  @Column({ type: 'float', default: 1 })
  miningPower!: number;

  @Column({ default: 1 })
  level!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
