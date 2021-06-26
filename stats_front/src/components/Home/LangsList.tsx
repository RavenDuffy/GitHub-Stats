import { Colours, ColourMap } from "../../types/colours"

const coloursIndexable = Colours as ColourMap

// measuring using a preloaded font to get over google fonts not being loaded in time
const calcTextWidth = (text: any): number => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx!.font = 'bold 8px Arial'
    return ctx!.measureText(text).width
}

const calcXY = (x: number, initialX: number=0, width: number, text: string): number[] => {
    const textWidth = calcTextWidth(text)
    console.log(text, textWidth)

    let newX = (textWidth + x <= width - 20) ? textWidth + 20 : -x + initialX;
    let newY = (textWidth + x <= width - 20) ? 0 : 16

    return [newX, newY]
}

export const LangsList = ({ ypos, langs }: any) => {
    const totalLangSize = langs.reduce((total: number, l: any) => {
        return total + l.usageNum
    }, 0)
    const width = 300

    let lastX = 20
    let lastY = ypos

    return (
        <>
            {langs.map((l: any) => {
                const colour = coloursIndexable[l.name].color
                const [newX, newY] = calcXY(
                    lastX, 20, width,
                    `${l.name}: ${(l.usageNum / totalLangSize * 100).toFixed(2)}%`,
                )
                lastX += newX
                lastY += newY
                return (
                    <g key={`${l.name}_wrapper`}>
                        <circle
                            key={`${l.name}_marker`}
                            cy={lastY - 3.5 - newY}
                            cx={lastX - 7 - newX}
                            fill={(colour !== undefined) ? colour as string : '#000'}
                            r="4">
                        </circle>
                        <text
                            key={`${l.name}_text`}
                            y={lastY - newY}
                            x={lastX - newX}
                            fill='#5ffbf1'
                            fontSize='8px'>
                            {`${l.name}: ${(l.usageNum / totalLangSize * 100).toFixed(2)}%`}
                        </text>
                    </g>
                )
            })}
        </>
    )
}