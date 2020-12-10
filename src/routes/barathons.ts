import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import getModel from '../db/models';

const router = Router();

// renvoie un tableau avec tous les pubs
router.get('/', async (req: Request, res: Response): Promise<void> => {
    const barathonModel = getModel('barathon');

    // find sans paramètre renvoie l'ensemble des documents de la collection
    const barathons = await barathonModel.find();
    res.json(barathons);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const barathonModel = getModel ('barathon');
        await barathonModel.validate(req.body);
        const barathon = new barathonModel(req.body);
        const insertedBarathon = await barathon.save();
        res.json(insertedBarathon);    
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(408);
            res.json({ error: true,  message: 'Bad request'});     
        }else{
            res.status(508);
            res.json({ error: true,  message: 'Server error'});                 
        }
    }
});

export default router;