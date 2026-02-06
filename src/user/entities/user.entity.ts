import { UserRunner } from 'src/user_runner/entities/user-runner.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'float', default: 0 })
  gameCoins: number;

  @Column({ type: 'float', default: 0 })
  criptoCoin: number;

  @OneToMany(() => UserRunner, ur => ur.user)
  runners: UserRunner[];

  @CreateDateColumn()
  createdAt: Date;
}
