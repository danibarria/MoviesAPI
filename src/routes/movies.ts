import { Router, Request, Response } from "express";
import { createConnection } from "typeorm";
import { Movie } from "../entity/movie";
import { actors } from "./actors";
import { Actor } from "../entity/actor";

export const movies = Router();

createConnection().then(connection => {
    const movieRepository = connection.getRepository(Movie)
    const actorRepository = connection.getRepository(Actor)

    movies.get('/', async (req:Request, res:Response) => {
        try {
            const movies = await movieRepository.query('SELECT * FROM movie')
            
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

            // await movieRepository.save(movie)
            
            res.status(201).send(movie)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    movies.put('/:id', async (req:Request, res:Response) => {
        const { params: { id } } = req;
        const { body: { name, releaseDate, imageUrl, country, director, actors } } = req;

        try {
            const updated = await movieRepository.update(id, { name, releaseDate, imageUrl, country, director })
            /** @todo ver como se agrega many to many*/ 
            res.status(200).send(updated)
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