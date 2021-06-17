export interface Language {
    name: string
    usageNum: number
}

export interface GitStats {
    totalCommits: number,
    totalRepos: number,
    mostUsedLangs: Language[]
}
