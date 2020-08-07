import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Actor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}