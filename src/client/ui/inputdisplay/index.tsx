import React from "@rbxts/react";
import { Motion as MotionEnum, Input as InputEnum, Motion, Input, ConvertMotionToMoveDirection} from "@quarrelgame-framework/common";
import { BindingOrValue, isBinding } from "@rbxts/pretty-react-hooks";
import { Joy } from "client/ui/inputdisplay/joy";

export interface InputDisplayProps extends Partial<WritableInstanceProperties<CanvasGroup>>
{
    Motion: BindingOrValue<Motion>;
    Input: BindingOrValue<Input | undefined>;
    DotsArea?: number;
}

// const inputDisplayVectors = {
//     [Motion.Neutral]: UDim2.fromScale(0.5, 0.5);
//     [Motion.Down]: UDim2.fromScale(0.5, 2);
// }

export function InputDisplay(Props: InputDisplayProps)
{   
    return <canvasgroup
        BackgroundColor3={Color3.fromRGB(75, 77, 80)}
        Size={UDim2.fromScale(0.377,0.215)}
        key = "Container"
        BorderSizePixel={0}

        {...({...Props, Motion: undefined, Input: undefined, DotsArea: undefined})}
    >
        <>
            <uicorner CornerRadius = {new UDim(0, 4)} />
            <uistroke Color = {new Color3(0,0,0)} Transparency={0.5 + (Props.BackgroundTransparency ?? 0)}/> 
            <uipadding 
                PaddingTop = {new UDim(0, 7)} 
                PaddingBottom = {new UDim(0, 5)} 
                PaddingLeft = {new UDim(0, 10)} 
                PaddingRight = {new UDim(0, 7)} 
            />

            <Joy Motion={Props.Motion} Input={Props.Input}>
                <frame 
                    BackgroundColor3 = {new Color3(1,1,1)}
                    AnchorPoint = {new Vector2(0, 0.5)}
                    Position = {UDim2.fromScale(1.15, 0.5)}
                    Size = {UDim2.fromScale(0.006,0.753)}
                    BackgroundTransparency = {Props.BackgroundTransparency ?? 0}
                    BorderSizePixel={0}
                    key = "Divider" 
                >
                    <uisizeconstraint 
                        MinSize={new Vector2(2,0)}
                    />
                </frame>
            </Joy>
        </>

        <>
            <canvasgroup 
                key = "ExtraInformation"
                Size={UDim2.fromScale(0.62,0.24)}
                Position={UDim2.fromScale(0.38,0.711)}
                BorderSizePixel={0}
                BackgroundTransparency={Props.BackgroundTransparency ?? 0}
                BackgroundColor3 = {Color3.fromRGB(42,42,42)}
            >

                <uicorner CornerRadius = {new UDim(0, 8)} />
            </canvasgroup>

            <canvasgroup
                key = "Inputs"
                Size={UDim2.fromScale(0.62,0.603)}
                Position={UDim2.fromScale(0.38,0.06)}
                BorderSizePixel={0}
                BackgroundTransparency={Props.BackgroundTransparency ?? 0}
                BackgroundColor3 = {Color3.fromRGB(42,42,42)}
            >
                <uicorner CornerRadius = {new UDim(0, 8)} />
            </canvasgroup>
        </>
    </canvasgroup>
}

export default InputDisplay;
