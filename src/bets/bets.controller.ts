import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';

@ApiTags('bet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) { }

  @Post()
  create(@Body() createBetDto: CreateBetDto) {
    return this.betsService.create(createBetDto);
  }


  @Get()
  findAll() {
    return this.betsService.findAll();
  }

  @Get(':sport')
  findAllBySport(@Param('sport') sport: string) {
    return this.betsService.findAllBySport(sport);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBetDto: UpdateBetDto) {
    return this.betsService.update(+id, updateBetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betsService.remove(+id);
  }

  @Post(':bet_option')
  winnerBet(@Param('bet_option') id: string) {
    return this.betsService.winnerBet(+id);
  }
}
