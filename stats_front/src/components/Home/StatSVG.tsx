import { StackedLangBar } from "./StackedLangBar"

export const StatSVG = ({ stats }: any) => {
    console.log(stats.stats.mostUsedLangs)

    return (
        <svg width={320} height={200}>
            <rect width={320} height={200} fill='#0f0f0f' rx='5px'></rect>
            <image width='125px' height='125px' href={stats.avatar}></image>
            <text x={5} y={18} fill='#ff3baa' fontWeight='bolder'>{stats.username}'s GitHub Stats</text>
            <StackedLangBar ypos={40} langs={stats.stats.mostUsedLangs}/>
        </svg>
    )
}