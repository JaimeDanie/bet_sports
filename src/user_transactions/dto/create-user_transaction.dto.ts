import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/user_transaction.entity';

export class CreateUserTransactionDto {

    @ApiProperty()
    user: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    category: Category;

    @ApiProperty()
    status: string;

    @ApiProperty()
    userBet: number;
}
