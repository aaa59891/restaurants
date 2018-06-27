import {Secret} from 'jsonwebtoken'
interface Config{
    bcrypt: {salt: number}
    email:{
        service: string
        account: string
        password: string
    },
    url: string,
    jwt:{
        secret: Secret,
        expiresIn: number | string
    }
}

const defaultConfig: Config = {
    bcrypt: {
        salt: 10
    },
    email:{
        service: 'gmail',
        account: 'chong901.test@gmail.com',
        password: '12#$qwer'
    },
    url: 'http://localhost:3000',
    jwt:{
        secret: 'secret',
        expiresIn: 60 * 60 * 60 * 24 // unit: second
    }
}

const prodConfig: Config = {
    ...defaultConfig
}

export const config: Config = process.env.NODE_ENV === 'prod'? prodConfig: defaultConfig;