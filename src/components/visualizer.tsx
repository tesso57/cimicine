import React, {useCallback, useEffect, useRef} from 'react'

interface Props {
    isStart: boolean
    class: string
}

const Visualizer = (props: Props) => {
    const Width = 202
    const Height = 69
    const Column = 14
    const Row = 29
    const BoxWidth = 6
    const BoxHeight = 4
    const BoxColor = '#707070'
    const Padding = 1

    const canvasRef = useRef(null);
    const requestRef = useRef();

    const getCanvasContext = () => {
        const canvas: any = canvasRef.current;
        if (canvas !== null) {
            canvas.width = Width
            canvas.height = Height
            const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d');
            return canvasContext;
        }
        return undefined
    }

    const printBar = (ctx: CanvasRenderingContext2D, x: number, num: number) => {
        let y = Height - BoxHeight;
        for (let i = 0; i < Math.max(num,1); i++) {
            ctx.fillRect(x, y, BoxWidth, BoxHeight);
            y -= (BoxWidth + Padding);
        }
    }

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    const printBars = useCallback((ctx: CanvasRenderingContext2D, isRandom: boolean) => {
        ctx.fillStyle = BoxColor
        ctx.lineWidth = 2;
        let x = 0
        for (let i = 0; i < Row; i++) {
            let num
            if (isRandom) {
                num = getRandomInt(Column)
            } else {
                num = 1
            }
            printBar(ctx, x, num)
            x += BoxWidth + Padding
        }
    },[])

    useEffect(() => {
        const ctx = getCanvasContext()
        if (ctx !== undefined) {
            printBars(ctx, false)
        }
    }, [printBars])

    const step = useCallback((timestamp: DOMHighResTimeStamp) => {
        const ctx = getCanvasContext()
        if (ctx !== undefined)
            printBars(ctx, true)
        // @ts-ignore
        requestRef.current = requestAnimationFrame(step);
    },[printBars])

    useEffect(() => {
        const ctx = getCanvasContext()
        if (ctx !== undefined) {
            if (props.isStart) {
                // @ts-ignore
                requestRef.current = requestAnimationFrame(step);
                // @ts-ignore
                return () => cancelAnimationFrame(requestRef.current);
            }else{
                printBars(ctx,false)
            }
        }
    },[props.isStart,printBars,step])


    return (
        <div>
            <canvas ref={canvasRef} className={props.class}/>
        </div>
    )
}

export default Visualizer