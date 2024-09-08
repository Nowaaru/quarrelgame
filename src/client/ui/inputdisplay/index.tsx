import Roact, { JsxInstanceProperties, useEffect, useState } from "@rbxts/roact";
import { Joy } from "./joy";
import Cursor from "./cursor";
import { Motion as _Motion, Input as _Input, Motion, Input, ConvertMotionToMoveDirection} from "@quarrelgame-framework/common";

interface InputDisplayProps extends Partial<WritableInstanceProperties<CanvasGroup>>
{
    Motion?: Motion;
    Input?: Input;
    DotsArea?: number;
}

// const inputDisplayVectors = {
//     [Motion.Neutral]: UDim2.fromScale(0.5, 0.5);
//     [Motion.Down]: UDim2.fromScale(0.5, 2);
// }

export function InputDisplay(Props: InputDisplayProps)
{
    const { DotsArea, Motion: __Motion = _Motion.Neutral, Input: __Input} = Props;
    const [motionDirection, setMotionDirection] = useState(ConvertMotionToMoveDirection(__Motion));


    useEffect(() =>
    {
        setMotionDirection(ConvertMotionToMoveDirection(__Motion))
    }, [__Motion, __Input])

    return <canvasgroup
        BackgroundColor3={Color3.fromRGB(75, 77, 80)}
        Size={UDim2.fromScale(0.377,0.215)}
        key = "Container"
        BorderSizePixel={0}

        {...({...Props, DotsArea: undefined, Motion: undefined, Input: undefined})}
    >
        <>
            <uicorner CornerRadius = {new UDim(0, 4)} />
            <uistroke Color = {new Color3(0,0,0)} Transparency={0.5}/> 
            <uipadding 
                PaddingTop = {new UDim(0, 7)} 
                PaddingBottom = {new UDim(0, 5)} 
                PaddingLeft = {new UDim(0, 10)} 
                PaddingRight = {new UDim(0, 7)} 
            />

            <Joy CursorProperties={{ Position: UDim2.fromScale(motionDirection.X, -motionDirection.Y) }} DotsArea={DotsArea} />
        </>


        <frame 
            BackgroundColor3 = {new Color3(1,1,1)}
            AnchorPoint = {new Vector2(0, 0.5)}
            Position = {UDim2.fromScale(0.316, 0.5)}
            Size = {UDim2.fromScale(0.006,0.753)}
            BorderSizePixel={0}
            key = "Divider" 
        />
        
        <>
            <canvasgroup 
                key = "ExtraInformation"
                Size={UDim2.fromScale(0.62,0.24)}
                Position={UDim2.fromScale(0.38,0.711)}
                BorderSizePixel={0}
                BackgroundColor3 = {Color3.fromRGB(42,42,42)}
            >

                <uicorner CornerRadius = {new UDim(0, 8)} />
            </canvasgroup>

            <canvasgroup
                key = "Inputs"
                Size={UDim2.fromScale(0.62,0.603)}
                Position={UDim2.fromScale(0.38,0.06)}
                BorderSizePixel={0}
                BackgroundColor3 = {Color3.fromRGB(42,42,42)}
            >
                <uicorner CornerRadius = {new UDim(0, 8)} />
            </canvasgroup>
        </>
    </canvasgroup>
}

export default InputDisplay;
