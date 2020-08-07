import { Router, Request, Response } from "express";
import { createConnection } from "typeorm";
import { Actor } from "../entity/actor";

export const actors = Router();

createConnection().then(connection => {
    const actorRepository = connection.getRepository(Actor)

    actors.get('/', async (req:Request, res:Response) => {
        try {
            const actors = await actorRepository.query('SELECT * FROM actor')

            res.status(200).send(actors)            
        } catch (error) {
            res.status(404).send(error)
        }
    })

    actors.get('/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        
        try {
            const actor = await actorRepository.findOne(id)
            res.status(200).send(actor)        
        } catch (error) {
            res.status(404).send(error)
        }
    })

    actors.post('/', async (req:Request, res:Response) => {
        const { body : { firstName, lastName } } = req;
        try {
            const actor = await actorRepository.create({ firstName, lastName })
            
            await actorRepository.save(actor)
            
            res.status(201).send(actor)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    actors.put('/:id', async (req:Request, res:Response) => {
        const { params: { id } } = req;
        const { body: { firstName, lastName } } = req;

        try {
            const updated = await actorRepository.update(id, { firstName, lastName })
            
            res.status(200).send(updated)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    actors.delete('/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        
        try {
            const deleted = await actorRepository.findOne(id)

            await actorRepository.delete(id)
            
            res.status(200).send(deleted)
        } catch (error) {
            res.status(404).send(error)
        }
    })

})