import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Preferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('text')
  cryptoAssets: string; 

  @Column()
  investorType: string; 

  @Column('text')
  contentTypes: string; 

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
