import Roact, { JsxInstanceProperties, PropsWithChildren, useMemo, useRef } from "@rbxts/roact";

interface DotProps 
    extends PropsWithChildren<Partial<JsxInstanceProperties<Frame>>>
{

}

interface DotsContainerProps
    extends PropsWithChildren<Partial<JsxInstanceProperties<CanvasGroup>>>
{
    Padding?: UDim;
    Size?: UDim2;
    /* Must be a perfect square.
     * Defaults to 3.
     */
    Area?: number;
    DotsProperties?: DotProps
}

export function Dots(Props: DotsContainerProps) 
{
    const {
        DotsProperties = {},
        Padding,
        Size = UDim2.fromOffset(8, 8),
        Area = 3,
    } = Props;

    assert(math.floor(math.sqrt(Area ** 2)) === Area, "area is not a perfect square",);

    const canvasGroupRef = useRef<CanvasGroup>();
    const absoluteSize = useMemo(() => 
    {
        const canvasRef = canvasGroupRef?.current;
        if (canvasRef) 

            return canvasRef.AbsoluteSize;

        return Vector2.zero;
    }, [canvasGroupRef]);

    const dotFrames = useMemo(() => 
    {
        const frameMap = [];
        for (let x = 0; x < Area; x++)

            for (let y = 0; y < Area; y++)

                frameMap.push(
                    <frame 
                        Size={Size} 
                        
                        {...({...DotsProperties, 
                            AnchorPoint: new Vector2(0, 0),
                            Position: UDim2.fromScale(1/8 + x / Area, 1/8 + y / Area),
                        })}
                    />
                );

        return frameMap;
    }, [absoluteSize]);

    return (
        <canvasgroup
            Size={UDim2.fromScale(1, 1)}
            Position={UDim2.fromScale(0.5, 0.5)}
            AnchorPoint={new Vector2(0.5, 0.5)}
            key="DotContainer"
            ref={canvasGroupRef}

            {...({...Props, Padding: undefined, DotsProperties: undefined, Area: undefined})}
        >
            {Padding ? (
                <uipadding
                    PaddingTop={Padding}
                    PaddingBottom={Padding}
                    PaddingLeft={Padding}
                    PaddingRight={Padding}
                />
            ) : undefined}

            {...dotFrames}
        </canvasgroup>
    );
}

export default Dots;
