import { StatSVG } from "./StatSVG"

export const Home = ({ stats }: any) => {

    return (
        <>
            <h3>Hey there {stats.username}</h3>

            <StatSVG stats={stats}/>
        </>
    )
}