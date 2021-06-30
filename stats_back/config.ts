import * as topConfig from '../config.json'

interface client {
    id: string,
    secret: string,
    scopes: string[]
}

interface mongo {
    [key: string]: string
}

interface hosts {
    [key: string]: string
}

interface config {
    client: client,
    mongo: mongo,
    hosts: hosts
}

const getConfig = (): config => {
    const conf: config = {
        client: topConfig.client,
        mongo: (process.env.NODE_ENV === 'production')
            ? topConfig.mongo.prod
            : topConfig.mongo.dev,
        hosts: (process.env.NODE_ENV === 'production')
            ? topConfig.hosts.prod
            : topConfig.hosts.dev
    }

    return conf
}

export { getConfig }