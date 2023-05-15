import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty()
    role: number;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    birth_date: Date;

    @ApiProperty()
    country_id: number;

    @ApiProperty()
    city: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    document_id: string;

    @ApiProperty()
    password: string;
}
