import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserBetDto } from './dto/create-user-bet.dto';
import { UpdateUserBetDto } from './dto/update-user-bet.dto';
import { UserBet } from './entities/user-bet.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Bet } from 'src/bets/entities/bet.entity';

@Injectable()
export class UserBetsService {
  constructor(
    @InjectRepository(UserBet) private userBetRepository: Repository<UserBet>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Bet) private betRepository: Repository<Bet>
  ) { }

  async create(createUserBetDto: CreateUserBetDto) {
    const user = await this.userRepository.findOne({
      where: { id: createUserBetDto.user },
    });
    const bet = await this.betRepository.findOne({
      where: {
        id: createUserBetDto.bet,
      },
    });
    if (!user) {
      return { success: false, message: 'user not found' };
    }

    if (!bet) {
      return { success: false, message: 'bet not found' };
    }

    if (!createUserBetDto.amount || !createUserBetDto.odd) {
      return { success: false, message: 'amount and odd is required!' };
    }
    const existUserBet = await this.userBetRepository.findOne({
      where: { user: { id: user.id }, bet: { event_id: bet.event_id } },
    });

    if (!existUserBet) {
      const newUserBet = { ...createUserBetDto, user, bet };
      const userbet = this.userBetRepository.create(newUserBet);
      await this.userBetRepository.save(userbet);

      return { success: true, data: userbet };
    }
    return { success: false, message: 'user bet exist by event id' };
  }

  findAll() {
    return this.userBetRepository.find();
  }

  async findOne(id: number) {
    const userbet = await this.userBetRepository.findOne({ where: { id } });
    if (!userbet) {
      return { success: false, message: 'user bet no exist' };
    }
    return { sucess: true, data: userbet }
  }

  update(id: number, updateUserBetDto: UpdateUserBetDto) {
    return `This action updates a #${id} userBet`;
  }

  async remove(id: number) {
    const userbet = await this.userBetRepository.findOne({ where: { id } });
    if (userbet) {
      return this.userBetRepository.remove(userbet);
    }
    return { success: false, message: 'user bet no exist' };
  }
}
