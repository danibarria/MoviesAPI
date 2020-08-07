import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Movie } from "./movie";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    name: string;

    @OneToMany(type => Movie, movie => movie.country)
    movies: Movie[];
}