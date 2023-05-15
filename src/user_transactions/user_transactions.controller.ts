import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserTransactionsService } from './user_transactions.service';
import { CreateUserTransactionDto } from './dto/create-user_transaction.dto';
import { UpdateUserTransactionDto } from './dto/update-user_transaction.dto';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';

@ApiTags('user-transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-transactions')
export class UserTransactionsController {
  constructor(
    private readonly userTransactionsService: UserTransactionsService,
  ) { }

  @Post()
  create(@Body() createUserTransactionDto: CreateUserTransactionDto) {
    return this.userTransactionsService.create(createUserTransactionDto);
  }

  @Get()
  findAll() {
    return this.userTransactionsService.findAll();
  }

  @Get('/balance/:user')
  findOne(@Param('user') id: string) {
    return this.userTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTransactionDto: UpdateUserTransactionDto,
  ) {
    return this.userTransactionsService.update(+id, updateUserTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTransactionsService.remove(+id);
  }
}
