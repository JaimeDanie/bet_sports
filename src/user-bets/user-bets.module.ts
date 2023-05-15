import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserBetsService } from './user-bets.service';
import { UserBetsController } from './user-bets.controller';
import { UserBet } from './entities/user-bet.entity';
import { User } from 'src/users/entities/user.entity';
import { Bet } from 'src/bets/entities/bet.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserBet, Bet, User]), UsersModule],
  controllers: [UserBetsController],
  providers: [UserBetsService]
})
export class UserBetsModule { }
