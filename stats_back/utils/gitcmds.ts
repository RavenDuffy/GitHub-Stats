import axios, { AxiosResponse } from 'axios';
import cors from 'cors'

import * as config from '../config.json'

async function GetAuth(queryCode: string): Promise<AxiosResponse<any>> {
    return await axios.post('https://github.com/login/oauth/access_token', {
        client_id: config.client.id,
        client_secret: config.client.secret,
        code: queryCode!
    })
}

async function GetCurrentUser(accessToken: string): Promise<AxiosResponse<any>> {
    return await axios.get(`https://api.github.com/user`, {
        headers: {
            "Authorization": `token ${accessToken}`
        }
    })
}

export { GetAuth, GetCurrentUser }