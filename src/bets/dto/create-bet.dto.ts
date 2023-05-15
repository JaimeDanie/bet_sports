import { ApiProperty } from '@nestjs/swagger';
export class CreateBetDto {

    @ApiProperty()
    bet_option: number;

    @ApiProperty()
    sport: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    event_id: number;

    @ApiProperty()
    odd: number;

    @ApiProperty()
    result: string;
}
