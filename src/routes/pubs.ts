// src/routes/pubs.ts


import { Request, Response, Router } from 'express';
import getModel from "../db/models";

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const pubModel = getModel('pub');
    const pubs = await pubModel.find();
    res.json(pubs);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> =>  {
    try{
        const pubModel = getModel('pub');
        const pub = await pubModel.findById(req.params.id);
        if(!pub){
            throw(new Error('Pub not fount'));
        }
        res.json(pub);
    }catch(err){
        res.status(404);
        res.json({ error: true, message: `Pub with id ${req.params.id} not found` });
    }

});

export default router;