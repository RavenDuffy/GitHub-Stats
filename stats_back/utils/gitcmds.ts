import axios, { AxiosResponse } from 'axios';

import { getConfig } from '../config';
import { GitStats, Language } from '../types'

const config = getConfig()

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

async function FetchRepos(accessToken: string): Promise<any[]> {
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

async function GetStats(accessToken: string, username: string): Promise<GitStats> {
    const stats: GitStats = { totalCommits: 0, totalRepos: 0, mostUsedLangs: [] }
    const repoInfo = await FetchRepos(accessToken)

    // get total repos
    stats.totalRepos = repoInfo.length

    for (const r of repoInfo) {
        // get most used languages (and their frequencies)
        const languages = (await axios.get(r.languages_url, {
            headers: {
                "Authorization": `token ${accessToken}`
            }
        })).data

        for (const lang of Object.entries(languages)) {
            if (!lang) continue;

            // putting this in to avoid a giant school repo I contributed to
            if (lang[0] == 'C' && r.full_name === 'RavenDuffy/GameSim') continue;

            if (!stats.mostUsedLangs.some(l => l.name == lang[0])) {
                const newLang: Language = {
                    name: lang[0],
                    usageNum: <number>lang[1]
                }
                stats.mostUsedLangs.push(newLang)
            } else {
                stats.mostUsedLangs.map(l => {
                    if (l.name == lang[0]) {
                        l.usageNum += <number>lang[1]
                        return;
                    }
                })
            }
        }
        // get total commits
        const contributors = await axios.get(r.contributors_url, {
            headers: {
                "Authorization": `token ${accessToken}`
            }
        })
        contributors.data.forEach((c: any) => {
            if (c.login === username) {
                stats.totalCommits += c.contributions
            }
        })
    }
    stats.mostUsedLangs.sort(compareLanguage)

    return stats
}

function compareLanguage(a: Language, b: Language): number {
    if (a.usageNum > b.usageNum) return -1;
    else if (a.usageNum < b.usageNum) return 1;
    return 0;
}

export { DoAuth, FetchCurrentUser, GetStats }