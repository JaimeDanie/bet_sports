import { PartialType } from '@nestjs/swagger';
import { CreateUserTransactionDto } from './create-user_transaction.dto';

export class UpdateUserTransactionDto extends PartialType(CreateUserTransactionDto) {}
