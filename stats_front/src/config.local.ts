import * as topConfig from './config.local.json'

interface client {
    id: string,
    secret: string,
    scopes: string[]
}

interface hosts {
    [key: string]: string
}

interface config {
    client: client,
    hosts: hosts
}

const getConfig = (): config => {
    const conf: config = {
        client: (process.env.NODE_ENV === 'production')
            ? topConfig.client.prod
            : topConfig.client.dev,
        hosts: (process.env.NODE_ENV === 'production')
            ? topConfig.hosts.prod
            : topConfig.hosts.dev
    }

    return conf
}

export { getConfig }