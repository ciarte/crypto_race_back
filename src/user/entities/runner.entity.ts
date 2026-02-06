import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('runners')
export class Runner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    assetName: string;

    @Column({ type: 'float', default: 1 })
    baseSpeed: number;

    @Column({ type: 'float', default: 1 })
    resistence: number;

    @Column({ type: 'float', default: 1 })
    powerUpDuration: number;

    @Column({ type: 'float', default: 1 })
    miningPower: number;

    @Column({ type: 'float', default: 0 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;
}
