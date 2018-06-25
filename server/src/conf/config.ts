interface Config{
    bcrypt: {salt: number}
}

const defaultConfig: Config = {
    bcrypt: {
        salt: 10
    }
}

const prodConfig: Config = {
    ...defaultConfig
}

export const config: Config = process.env.NODE_ENV === 'prod'? prodConfig: defaultConfig;