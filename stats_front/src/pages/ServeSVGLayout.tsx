import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStats } from "../actions/statsActions"
import { StatSVG } from "../components/Home/StatSVG"

export const ServeSVGLayout = (props: any) => {
    const dispatch = useDispatch()

    const id = props.match.params.gitId

    const recievedStats = useSelector((state: any) => state.statsReducer.userStats)

    useEffect(() => {
        if (recievedStats === undefined)
            dispatch(fetchStats(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recievedStats])

    return (
        <>
            {(recievedStats === undefined)
                ? <svg width='320' height='138'>
                    <rect width='320' height='138' rx='5' fill='#0f0f0f'></rect>
                    <text x='120' y='75' fill='#fff'>Loading...</text>
                </svg>
                : <StatSVG stats={recievedStats}/>
            }
        </>
    )
}