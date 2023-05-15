import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBetDto {

    @ApiProperty()
    user: number;

    @ApiProperty()
    bet: number;

    @ApiProperty()
    odd: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    state: string;
}
