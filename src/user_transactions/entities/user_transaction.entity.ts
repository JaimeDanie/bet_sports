import { BaseEntity } from 'src/BaseEntity';
import { UserBet } from 'src/user-bets/entities/user-bet.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, Column } from 'typeorm';

export enum Category {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
    BET = 'BET',
    WINNING = 'WINNING'
}

@Entity()
export class UserTransaction extends BaseEntity {

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column()
    amount: number;

    @Column()
    category: Category;

    @Column()
    status: string;

    @ManyToOne(() => UserBet, (userBet) => userBet.id, { nullable: true })
    userBet: UserBet;
}
