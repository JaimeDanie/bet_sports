import { Test, TestingModule } from '@nestjs/testing';
import { UserBetsController } from './user-bets.controller';
import { UserBetsService } from './user-bets.service';

describe('UserBetsController', () => {
  let controller: UserBetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBetsController],
      providers: [UserBetsService],
    }).compile();

    controller = module.get<UserBetsController>(UserBetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
