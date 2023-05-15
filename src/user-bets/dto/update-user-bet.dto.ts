import { PartialType } from '@nestjs/swagger';
import { CreateUserBetDto } from './create-user-bet.dto';

export class UpdateUserBetDto extends PartialType(CreateUserBetDto) {}
