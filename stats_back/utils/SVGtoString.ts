import { Colours, ColourMap } from "./colours"
import { createCanvas, registerFont } from 'canvas'
import path from 'path'
import * as FontURIs from '../fonts/FontURIs.json'

const coloursIndexable = Colours as ColourMap

// measuring using a preloaded font to get over google fonts not being loaded in time
const calcTextWidth = (text: any): number => {
    registerFont(path.join(__dirname, '../fonts/Montserrat-Regular.ttf'), { family: 'Montserrat' })

    const canvas = createCanvas(320, 320)
    const ctx = canvas.getContext('2d')
    ctx!.font = 'bold 8px Montserrat'
    return ctx!.measureText(text).width
}

const calcXY = (x: number, initialX: number=0, width: number, text: string): number[] => {
    const textWidth = calcTextWidth(text)

    let newX = (textWidth + x <= width - 20) ? textWidth + 20 : -x + initialX;
    let newY = (textWidth + x <= width - 20) ? 0 : 16

    return [newX, newY]
}

export const LangsListString = ({ ypos, langs }: any): string => {
    const totalLangSize = langs.reduce((total: number, l: any) => {
        return total + l.usageNum
    }, 0)
    const width = 300

    let lastX = 20
    let lastY = ypos

    return (langs.map((l: any) => {
        const colour = coloursIndexable[l.name].color
        const [newX, newY] = calcXY(
            lastX, 20, width,
            `${l.name}: ${(l.usageNum / totalLangSize * 100).toFixed(2)}%`,
        )
        lastX += newX
        lastY += newY
        return (
            `<g key='${l.name}_wrapper'>
                <circle
                    key='${l.name}_marker'
                    cy='${lastY - 3.5 - newY}'
                    cx='${lastX - 7 - newX}'
                    fill='${(colour !== undefined) ? colour as string : '#000'}'
                    r="4">
                </circle>
                <text
                    class='langText'
                    key='${l.name}_text'
                    y='${lastY - newY}'
                    x='${lastX - newX}'
                    fill='#5ffbf1'
                    font-size='9px'>
                    ${l.name}: ${(l.usageNum / totalLangSize * 100).toFixed(2)}%
                </text>
            </g>`
        )
    })).join('\n')
}

export const StackedLangBarString = ({ ypos, langs }: any): string => {
    const totalLangSize = langs.reduce((total: number, l: any) => {
        return total += l.usageNum
    }, 0)
    const width = 300

    let lastX = 9

    return langs.map((l:any) => {
        const localWidth = l.usageNum / totalLangSize * width
        lastX += localWidth
        const colour = coloursIndexable[l.name].color
        return (
            `<rect
                key='${l.name}'
                x='${lastX - localWidth}'
                y='${ypos}'
                width='${l.usageNum / totalLangSize * width}'
                height='5'
                fill='${(colour !== null) ? colour : '#000'}'>
            </rect>`
        )
    }).join('\n')
}

export const StatSVGString = (stats: any): string => {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="data:image/png;base64" version="1.1" width='320' height='138'>
            <defs>
                <style type='text/css'>
                    @font-face {
                        font-family: 'Montserrat';
                        src: url(${FontURIs.Montserrat})
                    }
                    * { font-family: 'Montserrat'; }
                    .langText { font-size: 8px; }
                </style>
            </defs>
            <rect width='320' height='138' fill='#0f0f0f' rx='5px'></rect>
            <text x='5' y='18' fill='#ff3baa' font-weight='bolder'>${stats.username}'s GitHub Stats</text>
            <text x='5' y='36' fill='#ff3baa' font-weight='normal' font-size='12px'>Most used Languages:</text>
            ${StackedLangBarString({ ypos: 49, langs: stats.stats.mostUsedLangs.slice(0, 5) })}
            ${LangsListString({ ypos: 72, langs: stats.stats.mostUsedLangs.slice(0, 5) })}
            <text x='5' y='110' fill='#ff3baa' font-weight='normal' font-size='12px'>
                Total Commits: <tspan fill='#00ffaa'>${stats.stats.totalCommits}</tspan></text>
            <text x='5' y='130' fill='#ff3baa' font-weight='normal' font-size='12px'>
                Total Repos: <tspan fill='#00ffaa'>${stats.stats.totalRepos}</tspan></text>
        </svg>
    `
}