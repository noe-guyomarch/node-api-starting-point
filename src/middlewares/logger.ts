import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
    const today = new Date();
    console.log(`${today.getTime()}: ${req.protocol} / ${req.method} / ${req.url}`);

    next();
};