import { BaseEntity } from 'src/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Bet extends BaseEntity {

    @Column()
    bet_option: number;

    @Column()
    sport: string;

    @Column()
    status: string;

    @Column()
    name: string;

    @Column()
    event_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    odd: number;

    @Column()
    result: string;
}
