import { Test, TestingModule } from '@nestjs/testing';
import { UserTransactionsController } from './user_transactions.controller';
import { UserTransactionsService } from './user_transactions.service';

describe('UserTransactionsController', () => {
  let controller: UserTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTransactionsController],
      providers: [UserTransactionsService],
    }).compile();

    controller = module.get<UserTransactionsController>(UserTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
