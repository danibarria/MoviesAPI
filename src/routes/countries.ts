import { Router, Request, Response } from "express";
import { createConnection } from "typeorm";
import { Country } from "../entity/country";

export const countries = Router();

createConnection().then(connection => {
    const countryRepository = connection.getRepository(Country);

    countries.get('/', async (req:Request, res:Response) => {
        try {
            const countries = await countryRepository.query('SELECT * FROM country')

            res.status(200).send(countries)           
        } catch (error) {
            res.status(404).send(error)
        }
    })

    countries.get('/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        
        try {
            const country = await countryRepository.findOne(id)
            res.status(200).send(country)        
        } catch (error) {
            res.status(404).send(error)
        }
    })

    countries.post('/', async (req:Request, res:Response) => {
        const { body : { name } } = req;
        try {
            const country = await countryRepository.create({ name })
            
            await countryRepository.save(country)
            
            res.status(201).send(country)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    countries.put('/:id', async (req:Request, res:Response) => {
        const { params: { id } } = req;
        const { body: { name } } = req;

        try {
            const country = await countryRepository.update(id, { name })
            
            res.status(200).send(country)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    countries.delete('/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        
        try {
            const deleted = await countryRepository.findOne(id)

            await countryRepository.delete(id)
            
            res.status(200).send(deleted)
        } catch (error) {
            res.status(404).send(error)
        }
    })

});
