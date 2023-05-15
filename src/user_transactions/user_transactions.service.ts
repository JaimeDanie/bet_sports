import { UserBet } from './../user-bets/entities/user-bet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserTransactionDto } from './dto/create-user_transaction.dto';
import { UpdateUserTransactionDto } from './dto/update-user_transaction.dto';
import { Repository } from 'typeorm';
import { Category, UserTransaction } from './entities/user_transaction.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserTransactionsService {
  constructor(
    @InjectRepository(UserTransaction) private userTransactionRepository: Repository<UserTransaction>,
    @InjectRepository(UserBet) private userBetRepository: Repository<UserBet>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createUserTransactionDto: CreateUserTransactionDto) {
    let userBet = null;
    const user = await this.userRepository.findOne({
      where: { id: createUserTransactionDto.user },
    });

    if (!user) {
      return { success: false, message: 'user not found' };
    }

    if (createUserTransactionDto.userBet) {
      userBet = await this.userBetRepository.findOne({
        where: { id: createUserTransactionDto.userBet },
      });
    }
    const balance = await this.obtainSaldo(user.id);
    if (
      (createUserTransactionDto.category === Category.WITHDRAW &&
        balance > 0 &&
        balance - createUserTransactionDto.amount >= 0) ||
      createUserTransactionDto.category !== Category.WITHDRAW
    ) {
      const transaction = { ...createUserTransactionDto, user: user, userBet };
      const newTransaction = this.userTransactionRepository.create(transaction);
      await this.userTransactionRepository.save(newTransaction);
      return { sucess: true, data: newTransaction };
    }
    return { sucess: false, message: 'Balance not enough' };

  }

  findAll() {
    return `This action returns all userTransactions`;
  }

  async findOne(id: number) {
    const user = await this.userTransactionRepository.find({
      where: { user: { id } },
      relations: ['user']
    });
    if (user.length == 0) {
      return { sucess: false, message: 'User transaction no exist' };
    }
    console.log("USER==>", user[0])
    const balance = await this.obtainSaldo(user[0].user.id);
    return { sucess: true, data: balance };
  }

  update(id: number, updateUserTransactionDto: UpdateUserTransactionDto) {
    return `This action updates a #${id} userTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTransaction`;
  }

  async obtainSaldo(userId: number) {
    console.log('USERID==>', userId)
    let bet = 0,
      winning = 0,
      withdraw = 0,
      deposit = 0;
    const transactions = await this.userTransactionRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    console.log('TRANSACTIONS==>', transactions);
    transactions.map((transaction) => {
      switch (transaction?.category) {
        case Category.BET:
          console.log('BET==>');
          bet += transaction.amount;
          break;
        case Category.WINNING:
          console.log('WINNING==>');
          winning += transaction.amount;
          break;
        case Category.WITHDRAW:
          console.log('WITHDRAW==>');
          withdraw += transaction.amount;
          break;
        case Category.DEPOSIT:
          console.log('DEPOSIT==>');
          deposit += transaction.amount;
          break;
      }
    });
    console.log('DATASUM==>', deposit, winning, bet, withdraw);
    return deposit + winning - bet - withdraw;
  }
}
