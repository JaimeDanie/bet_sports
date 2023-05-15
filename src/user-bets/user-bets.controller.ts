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
import { UserBetsService } from './user-bets.service';
import { CreateUserBetDto } from './dto/create-user-bet.dto';
import { UpdateUserBetDto } from './dto/update-user-bet.dto';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';

@ApiTags('user-bet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-bets')
export class UserBetsController {
  constructor(private readonly userBetsService: UserBetsService) { }


  @Post()
  create(@Body() createUserBetDto: CreateUserBetDto) {
    return this.userBetsService.create(createUserBetDto);
  }

  @Get()
  findAll() {
    return this.userBetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBetDto: UpdateUserBetDto) {
    return this.userBetsService.update(+id, updateUserBetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBetsService.remove(+id);
  }
}
