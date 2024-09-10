import { BindingOrValue } from "@rbxts/pretty-react-hooks";
import React, { MutableRefObject, PropsWithChildren, Ref, RefObject, createBinding, useEffect, useMemo, useRef } from "@rbxts/react";
import { getBindingValue } from "@rbxts/pretty-react-hooks";

interface DotProps 
    extends PropsWithChildren<Omit<Partial<InstanceProperties<Frame>>, "Size" | "AnchorPoint">>
{

    /* Must be a perfect square.
     * Defaults to 3.
     */
    Size?: number;
    Area?: number;
    AnchorPoint?: number;
    GuiObject: RefObject<GuiObject>;
}
export function Dots(Props: DotProps) 
{
    const {
        Area = 3,
        Size = 4,
        AnchorPoint = 0.5,
        GuiObject: incomingGuiObject,
    } = Props;

    assert(math.floor(math.sqrt(Area ** 2)) === Area, "area is not a perfect square",);
    const [canvasGroup, setGuiObject] = createBinding(incomingGuiObject.current);

    const absoluteSize = useMemo(() => 
    {
        return getBindingValue(canvasGroup)
    }, [canvasGroup]);

    const dotFrames = useMemo(() => 
    {
        // TODO: use absolutesize and absoluteposition
        // to try and make this compatible with just 
        // about any UI design choice
            
        const frameMap = [];
        for (let x = 0; x < Area; x++)

            for (let y = 0; y < Area; y++)
            {
                const areaDivided = (AnchorPoint / Area);
                const frameX = x / Area, frameY = y / Area;
                const framePosition = new UDim2(frameX + areaDivided, 0, frameY + areaDivided, 0);

                frameMap.push(
                    <frame 
                        {...({...Props, 
                            GuiObject: undefined,
                            AnchorPoint: new Vector2(AnchorPoint, AnchorPoint),
                            Position: framePosition,
                            Size:  UDim2.fromOffset(Size, Size),
                            Area: undefined,
                            key: `Dot${x*y}`,
                        })}
                    />
                );
           }

        return frameMap;
    }, [absoluteSize]);

    useEffect(() =>
    {
        const realBinding = getBindingValue(incomingGuiObject.current);
        if (realBinding !== canvasGroup.getValue())

            setGuiObject(realBinding);

    }, [incomingGuiObject])

    return (
        <>
            {...dotFrames}
        </>
    );
}

export default Dots;
