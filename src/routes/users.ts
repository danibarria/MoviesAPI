import { Router, Request, Response } from "express";
export const users = Router();
import { User } from "../entity/User";


users.get('/', async (req:Request, res:Response) => {
    try {
        res.status(200).send('Sale Bien')
        
    } catch (error) {
        res.status(404).send('Sale Mal')
    }
})

users.get("/users", async function(req: Request, res: Response) {
    // const users = await userRepository.find();
    // res.json(users);
});

users.get("/users/:id", async function(req: Request, res: Response) {
    // const results = await userRepository.findOne(req.params.id);
    // return res.send(results);
});

users.post("/users", async function(req: Request, res: Response) {
    // const user = await userRepository.create(req.body);
    // const results = await userRepository.save(user);
    // return res.send(results);
});

users.put("/users/:id", async function(req: Request, res: Response) {
    // const user = await userRepository.findOne(req.params.id);
    // userRepository.merge(user, req.body);
    // const results = await userRepository.save(user);
    // return res.send(results);
});

users.delete("/users/:id", async function(req: Request, res: Response) {
    // const results = await userRepository.delete(req.params.id);
    // return res.send(results);
});