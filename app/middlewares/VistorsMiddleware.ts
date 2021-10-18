import { Response, Request, NextFunction } from "express";

export default class VisitorsMiddleware {
    public validateTimeStamp = (req: Request, res: Response, next: NextFunction) => {
        const dateInMilliseconds =  req.query.date as string;
        if(dateInMilliseconds) {
            const newTimestamp = new Date(parseInt(dateInMilliseconds)).toISOString();
            console.log(newTimestamp);
        }
    }
}