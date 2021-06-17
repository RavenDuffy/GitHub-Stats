export interface Language {
    name: string
    usageNum: number
}

export interface GitStats {
    totalCommits: number,
    totalRepos: number,
    mostUsedLangs: Language[]
}

// stats formatted for frontend
export interface FrontStats {
    username: string,
    avatar: string,
    stats: GitStats | null
}