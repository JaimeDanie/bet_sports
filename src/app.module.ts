import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetsModule } from './bets/bets.module';
import { UserBetsModule } from './user-bets/user-bets.module';
import { UserTransactionsModule } from './user_transactions/user_transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bet_sports',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    BetsModule,
    UserBetsModule,
    UserTransactionsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
