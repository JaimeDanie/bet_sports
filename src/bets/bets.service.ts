import { Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { Repository } from 'typeorm';
import { Category, UserTransaction } from 'src/user_transactions/entities/user_transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { UserBet } from 'src/user-bets/entities/user-bet.entity';

@Injectable()
export class BetsService {
  constructor(@InjectRepository(Bet) private betRepository: Repository<Bet>,
    @InjectRepository(UserTransaction)
    private userTransactionRepository: Repository<UserTransaction>,
    @InjectRepository(UserBet)
    private userBetRepository: Repository<UserBet>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  create(createBetDto: CreateBetDto) {
    const newBet = this.betRepository.create(createBetDto);
    return this.betRepository.save(newBet);
  }

  findAll() {
    return this.betRepository.find({ where: { delete: 0 } });
  }

  findAllBySport(sport: string) {
    return this.betRepository.find({ where: { sport } });
  }

  async findOne(id: number) {
    const findBet = this.betRepository.findOne({ where: { id } });
    if (findBet) {
      return { success: true, data: findBet };
    }
    return { success: false, message: 'bet not found' };
  }

  async update(id: number, updateBetDto: UpdateBetDto) {
    let findBet = await this.betRepository.findOne({ where: { id } });
    if (findBet) {
      findBet = { ...findBet, ...updateBetDto };
      const newBet = await this.betRepository.save(findBet);
      return { success: true, data: newBet };
    }
    return { success: false, message: 'Bet not found' };
  }

  async remove(id: number) {
    const findBet = await this.betRepository.findOne({ where: { id } });
    if (findBet) {
      findBet.status = 'CANCELLED';
      findBet.delete = 1;
      findBet.deleted_at = new Date();
      const newBet = await this.betRepository.save(findBet);
      return { success: true, data: newBet };
    }
    return { success: false, message: 'Bet not found' };
  }


  async winnerBet(id: number) {
    const findBet = await this.betRepository.findOne({
      where: { bet_option: id },
    });
    if (findBet && findBet?.status === 'open') {
      const betsEvents = await this.betRepository.find({
        where: {
          event_id: findBet.event_id,
        },
      });

      await Promise.all(
        betsEvents.map(async (bet) => {
          if (bet.id !== findBet.id) {
            bet.result = 'lost';
            await this.betRepository.save(bet);
          }
        }),
      );
      findBet.result = 'win';
      await this.betRepository.save(findBet);
      const userbets = await this.userBetRepository.find({
        where: {
          bet: { id },
        },
        relations: ['user', 'bet'],
      });

      const findBetsEvents = await this.betRepository.find({
        where: { event_id: findBet.event_id },
      });

      // VERIFICAR Y SETEAR POR EVENT ID LOS PERDEDORES
      await Promise.all(
        findBetsEvents.map(async (bet) => {
          if (bet?.id !== findBet.id) {
            const userbetsLost = await this.userBetRepository.findOne({
              where: {
                bet: { id: bet.id },
              },
            });
            if (userbetsLost) {
              userbetsLost.state = 'lost';
              await this.userBetRepository.save(userbetsLost);
            }
          }
        }),
      );

      await Promise.all(
        userbets.map(async (userbet) => {
          const newTransaction = {
            user: await this.userRepository.findOne({
              where: { id: userbet.user.id },
            }),
            amount: userbet.amount * userbet.odd,
            category: Category.WINNING,
            status: 'ACTIVE',
            userBet: userbet,
          };
          userbet.state = 'won';
          await this.userBetRepository.save(userbet);
          const transaction = this.userTransactionRepository.create(newTransaction);
          await this.userTransactionRepository.save(transaction);
        }));

      return { success: true, data: findBet };

    }
    if (findBet?.status !== 'open') {
      return { success: false, message: 'bet has closed' };
    }
    return { success: false, message: 'Bet not found' };
  }
}
