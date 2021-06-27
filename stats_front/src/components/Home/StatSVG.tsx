import { StackedLangBar } from "./StackedLangBar"
import { LangsList } from "./LangsList"

export const StatSVG = ({ stats }: any) => {
    return (
        <svg width={320} height={138}>
            <rect width={320} height={138} fill='#0f0f0f' rx='5px'></rect>
            <image width='120px' height='120px' href={stats.avatar} opacity='0.2' x={191} y={9}></image>
            <text x={5} y={18} fill='#ff3baa' fontWeight='bolder'>{stats.username}'s GitHub Stats</text>
            <text x={5} y={36} fill='#ff3baa' fontWeight='normal' fontSize='12px'>Most used Languages:</text>
            <StackedLangBar ypos={48} langs={stats.stats.mostUsedLangs.slice(0, 5)} />
            <LangsList ypos={73} langs={stats.stats.mostUsedLangs.slice(0, 5)} />
            <text x={5} y={110} fill='#ff3baa' fontWeight='normal' fontSize='12px'>
                Total Commits: <tspan fill='#00ffaa'>{stats.stats.totalCommits}</tspan></text>
            <text x={5} y={130} fill='#ff3baa' fontWeight='normal' fontSize='12px'>
                Total Repos: <tspan fill='#00ffaa'>{stats.stats.totalRepos}</tspan></text>
        </svg>
    )
}