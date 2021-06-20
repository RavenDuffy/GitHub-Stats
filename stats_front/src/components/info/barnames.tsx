import { FC } from "react"
import { Colours } from '../../colours'
import styles from './info.module.scss'

interface colourMapType {
    [key: string]: {
        color: string | null,
        url: string
    }
}

const coloursIndexable = Colours as colourMapType

export const BarNames:FC<any> = ({ langs }) => {
    const totalLangSize = langs.reduce((total: number, l: any) => total + l.usageNum, 0)

    return (
        <div className={styles.labelWrapper}>
            {langs.map((l: any) => {
                const colour = coloursIndexable[l.name].color
                return (
                    <div className={styles.label} key={l.name}>
                        <div className={styles.labelColour} style={{backgroundColor: (colour !== null) ? colour : '#000'}}></div>
                        <p>{l.name}: {(l.usageNum / totalLangSize * 100).toFixed(2)}%</p>
                    </div>
                )
            })}
        </div>
    )
}