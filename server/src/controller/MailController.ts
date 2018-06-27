import { Request, Response, NextFunction } from "express-serve-static-core";
import { MailHelper } from "../shared/MailHelper";
import { config } from "../conf/config";
import { MailService } from "../services/MailService";

export class MailController{
    constructor(private mailService: MailService){}

    async sendEmailToFriend(req: Request, res: Response, next: NextFunction){
        try {
            const {email, userId, collectionId} = req.body;
            if(!email){
                res.status(401).send('Email is empty.');
                return;
            }
            const url = await this.mailService.sendMailToEmail(email, userId, collectionId);
            res.send(url);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }
}