import { BaseEntity } from 'src/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column({ type: 'date' })
    birth_date: Date;

    @Column()
    country_id: number;

    @Column()
    city: string;

    @Column()
    category: string;

    @Column({ unique: true })
    document_id: string;

    @Column()
    user_state: number;

    @Column()
    password: string;

}
