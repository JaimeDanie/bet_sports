import { BaseEntity } from 'src/BaseEntity';
import { Bet } from 'src/bets/entities/bet.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, Column } from 'typeorm';

@Entity()
export class UserBet extends BaseEntity {

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Bet, (bet) => bet.id)
    bet: Bet;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    odd: number;

    @Column()
    amount: number;

    @Column()
    state: string;
}
