import * as jsonwebtoken from 'jsonwebtoken';
import { config } from '../conf/config';
export class JwtHelper{
    static createJwt(payload: any){
        return jsonwebtoken.sign(payload, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
    }
    static decodeAndVarifyJwt(token){
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, config.jwt.secret, (err, decode) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(decode);
            });
        });
    }
}