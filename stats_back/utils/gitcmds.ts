import axios, { AxiosResponse } from 'axios';

import * as config from '../../config.json'
import { GitStats } from './types'

async function DoAuth(queryCode: string): Promise<AxiosResponse<any>> {
    return await axios.post('https://github.com/login/oauth/access_token', {
        client_id: config.client.id,
        client_secret: config.client.secret,
        code: queryCode!
    })
}

async function FetchCurrentUser(accessToken: string): Promise<AxiosResponse<any>> {
    return await axios.get(`https://api.github.com/user`, {
        headers: {
            "Authorization": `token ${accessToken}`
        }
    })
}

async function FetchRepos(accessToken: string): Promise<AxiosResponse<any>[]> {
    let repos: any[] = []

    let pageNum = 1
    while (true) {
        const repo = await axios.get(`https://api.github.com/user/repos?per_page=100&page=${pageNum}`, {
            headers: {
                "Authorization": `token ${accessToken}`
            }
        })
        repos = repos.concat(repo.data)

        if (repo.headers.link && !repo.headers.link.includes('rel="next"')) break;
        else pageNum++
    }

    return repos
}

async function GetStats(accessToken: string): Promise<GitStats> {
    const stats: GitStats = { totalCommits: 0, totalRepos: 0, mostUsedLangs: [] }

    const repoInfo = await FetchRepos(accessToken)

    stats.totalRepos = repoInfo.length


    return stats
}

export { DoAuth, FetchCurrentUser, GetStats }