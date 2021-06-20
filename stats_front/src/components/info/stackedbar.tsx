import { FC } from "react";
import { Colours } from '../../colours'

interface colourMapType {
    [key: string]: {
        color: string | null,
        url: string
    }
}

const coloursIndexable = Colours as colourMapType

export const StackedBar: FC<any> = ({ langs }) => {
    const totalLangSize = langs.reduce((total: number, l: any) => total + l.usageNum, 0)
    const width = 380;
    
    let lastX = 0;

    return (
        <svg width={width} height='5'>
            {langs.map((l: any) => {
                const localWidth = l.usageNum / totalLangSize * width
                lastX += localWidth
                const colour = coloursIndexable[l.name].color
                return (
                    <rect 
                        key={l.name} 
                        x={lastX - localWidth} 
                        y='0' 
                        width={l.usageNum / totalLangSize * width} 
                        height='5' 
                        fill={(colour !== null) ? colour : '#000'}>
                    </rect>
                )
            })}
        </svg>
    )
}