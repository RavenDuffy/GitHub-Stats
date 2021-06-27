import { Colours, ColourMap } from "../../types/colours";

const coloursIndexable = Colours as ColourMap

export const StackedLangBar = ({ ypos, langs }: any) => {
    const totalLangSize = langs.reduce((total: number, l: any) => {
        return total += l.usageNum
    }, 0)
    const width = 300

    let lastX = 9

    return (
        <>
            {langs.map((l:any) => {
                const localWidth = l.usageNum / totalLangSize * width
                lastX += localWidth
                const colour = coloursIndexable[l.name].color
                return (
                    <rect
                        key={l.name}
                        x={lastX - localWidth}
                        y={ypos}
                        width={l.usageNum / totalLangSize * width}
                        height={5}
                        fill={(colour !== null) ? colour : '#000'}>
                    </rect>
                )
            })}
        </>
    )
}