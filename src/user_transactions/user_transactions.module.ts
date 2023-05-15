import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserTransactionsService } from './user_transactions.service';
import { UserTransactionsController } from './user_transactions.controller';
import { UserBet } from 'src/user-bets/entities/user-bet.entity';
import { Bet } from 'src/bets/entities/bet.entity';
import { User } from 'src/users/entities/user.entity';
import { UserTransaction } from './entities/user_transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserBet, Bet, User, UserTransaction])],
  controllers: [UserTransactionsController],
  providers: [UserTransactionsService]
})
export class UserTransactionsModule { }
