import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Preferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('text')
  cryptoAssets: string; // JSON string: ["BTC","ETH"]

  @Column()
  investorType: string; // HODLer / DayTrader / NFTCollector

  @Column('text')
  contentTypes: string; // JSON string: ["News","Charts"]

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
