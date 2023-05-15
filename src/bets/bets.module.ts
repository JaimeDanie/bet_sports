import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { UserTransaction } from 'src/user_transactions/entities/user_transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { UserTransactionsModule } from 'src/user_transactions/user_transactions.module';
import { UserBetsModule } from 'src/user-bets/user-bets.module';
import { UserBet } from 'src/user-bets/entities/user-bet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet, UserTransaction, User, UserBet]),
    UsersModule,
    UserTransactionsModule,
    UserBetsModule
  ],
  controllers: [BetsController],
  providers: [BetsService]
})
export class BetsModule { }
