import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('preferences')   // אפשר להשאיר בלי שם, אבל עדיף לציין
export class Preferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // במקום 'text' + JSON string → simple-array שומר אוטומטית מערך!
  @Column('simple-array')
  cryptoAssets: string[];   // למשל: ["BTC","ETH","SOL"]

  @Column()
  investorType: string;     // למשל: "HODLer"

  @Column('simple-array')
  contentTypes: string[];   // למשל: ["Prices","News","Fun","AI"]

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
