import { Router, Request, Response } from "express";
import { createConnection, getConnection, Like } from "typeorm";
import { Movie } from "../entity/movie";
import { Actor } from "../entity/actor";

export const movies = Router();

createConnection().then(connection => {
    const movieRepository = connection.getRepository(Movie)
    const actorRepository = connection.getRepository(Actor)

    movies.get('/', async (req:Request, res:Response) => {
        // define default values for skip & take
        const skip: number = Number.parseInt(req.query.skip as string) || 0
        const take: number = Number.parseInt(req.query.take as string) || 10
        const filter: string = req.query.filter as string || null
        const filters = filter ? { name: Like(`%${filter}%`) } : {}

        try {
            const movies = await movieRepository.find({
                where: filters,
                order: {
                    name: 'ASC'
                    },
                skip,
                take
            })
            
            res.status(200).send(movies)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    movies.get('/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        
        try {
            const movie = await movieRepository.findOne(id)

            res.status(200).send(movie)        
        } catch (error) {
            res.status(404).send(error)
        }
    })

    movies.post('/', async (req:Request, res:Response) => {
        const { body : { name, releaseDate, imageUrl, country, director, actors } } = req;
        try {
            const movie = await movieRepository.create({ name, releaseDate, imageUrl, country, director })
            
            const actorsFound = await actorRepository.findByIds(actors)
            
            movie.actors = [...actorsFound]
            await connection.manager.save(movie);
            
            res.status(201).send(movie)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    movies.put('/:id', async (req:Request, res:Response) => {
        const { params: { id } } = req;
        const { body: { name, releaseDate, imageUrl, country, director, actors } } = req;

        try {
            const movie = await movieRepository.findOne(id)
            // update movie data
            await movieRepository.update(id, { name, releaseDate, imageUrl, country, director })
            // update actors relation
            const actorsFound = await actorRepository.findByIds(actors)

            movie.actors = [...actorsFound]
            await connection.manager.save(movie);

            res.status(200).send(movie)
        } catch (error) {
            res.status(404).send(error)
        }
    })
    
    movies.delete('/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        
        try {
            const deleted = await movieRepository.findOne(id)

            await movieRepository.delete(id)
            
            res.status(200).send(deleted)
        } catch (error) {
            res.status(404).send(error)
        }
    })

})