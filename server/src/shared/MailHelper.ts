import * as nodemailer from 'nodemailer';
import { Email } from '../conf/EmailTemplate';
export class MailHelper{
    private transporter: nodemailer.Transporter;
    constructor(
        private service: string,
        private email: string,
        private password: string
     ){
        this.transporter = nodemailer.createTransport({
            service: this.service,
            auth:{
                user: this.email,
                pass: this.password
            }
        })
    }

    sendMail(to: string, email: Email){
        const option: nodemailer.SendMailOptions = {
            ...email,
            from: this.email,
            to: to
        };
        return this.transporter.sendMail(option)
    }
}