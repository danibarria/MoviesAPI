import { Router, Request, Response } from "express";
import { createConnection } from "typeorm";
import { Director } from "../entity/director";

export const directors = Router();

createConnection().then(connection => {
    const directorRepository = connection.getRepository(Director);

    directors.get('/', async (req:Request, res:Response) => {
        try {
            const directors = await directorRepository.query('SELECT * FROM director')
            
            res.status(200).send(directors)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    directors.get('/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        
        try {
            const director = await directorRepository.findOne(id)
            
            res.status(200).send(director)        
        } catch (error) {
            res.status(404).send(error)
        }
    })

    directors.post('/', async (req:Request, res:Response) => {
        const { body : { firstName, lastName } } = req;
        try {
            const director = await directorRepository.create({ firstName, lastName })
            
            await directorRepository.save(director)
            
            res.status(201).send(director)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    directors.put('/:id', async (req:Request, res:Response) => {
        const { params: { id } } = req;
        const { body: { firstName, lastName } } = req;

        try {
            const updated = await directorRepository.update(id, { firstName, lastName })
            
            res.status(200).send(updated)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    directors.delete('/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        
        try {
            const deleted = await directorRepository.findOne(id)

            await directorRepository.delete(id)
            
            res.status(200).send(deleted)
        } catch (error) {
            res.status(404).send(error)
        }
    })

})