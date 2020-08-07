import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Country } from "./country";
import { Director } from "./director";
import { Actor } from "./actor";

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({ type:"date" })
    releaseDate: string;
    
    @Column()
    imageUrl: string;

    @ManyToOne(type => Country, country => country.movies, {
        eager:true
    })
    country: Country;

    @ManyToOne(type => Director, director => director.movies,{
        eager:true
    })
    director: Director;

    @ManyToMany(type => Actor, {
        eager:true
    })
    @JoinTable()
    actors: Actor[];

}
