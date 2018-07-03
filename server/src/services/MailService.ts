import { MailHelper } from "../shared/MailHelper";
import { config } from "../conf/config";
import { CollaborationEmail } from "../conf/EmailTemplate";
import { JwtHelper } from "../shared/JwtHelper";
export class MailService{
    mailHelper: MailHelper;
    constructor(){
        this.mailHelper = new MailHelper(config.email.service, config.email.account, config.email.password);
    }
    async sendMailToEmail(to: string, userId: number){
        const mailTemplate = {...CollaborationEmail};
        const token = JwtHelper.createJwt({userId});
        const url = config.url + `/collaborate?token=${token}`;
        mailTemplate.text = mailTemplate.text.replace('{url}', url); 
        await this.mailHelper.sendMail(to, mailTemplate);
        return url;
    }
}