import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Movie } from "./movie";

@Entity()
export class Director {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(type => Movie, movie => movie.director)
    movies: Movie[];

}