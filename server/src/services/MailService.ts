import { MailHelper } from "../shared/MailHelper";
import { config } from "../conf/config";
import { CollaborationEmail } from "../conf/EmailTemplate";
import * as jsonwebtoken from 'jsonwebtoken';
export class MailService{
    async sendMailToEmail(to: string, userId: number, collectionId: number){
        const mailHelper = new MailHelper(config.email.service, config.email.account, config.email.password);
        const mailTemplate = CollaborationEmail;
        const jwt = jsonwebtoken.sign({userId, collectionId}, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
        const url = config.url + `/collaborate?token=${jwt}`;
        mailTemplate.text = mailTemplate.text.replace('{url}', url); 
        await mailHelper.sendMail(to, mailTemplate);
        return url;
    }
}