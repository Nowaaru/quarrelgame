import Roact, { Children, useMemo, useRef, useState } from "@rbxts/roact";
import Cursor, { CursorProps } from "./cursor";
import Dots from "./dots";

interface Joy {
    CursorProperties: CursorProps,
    Size?: UDim2;
    Position?: UDim2;
    CornerRadius?: UDim;
    DotsArea?: number;

    key?: string
}

export function Joy({
    CursorProperties,
    Size = UDim2.fromScale(0.292, 0.874), 
    Position = UDim2.fromScale(0.0, 0.5),
    CornerRadius = new UDim(0, 4),

    key = tostring({})
}: Joy)
{
    return <canvasgroup
        Size = {Size}
        Position = {Position}
        BackgroundColor3={Color3.fromRGB(42,42,42)}
        SizeConstraint = {Enum.SizeConstraint.RelativeXX}
        AnchorPoint = {new Vector2(0, 0.5)}
        key = {key}
    >
        <Dots 
            BackgroundTransparency={1}
            DotsProperties = {{
                BackgroundColor3: Color3.fromRGB(22,22,22),
                children: new Map([
                    ["corner", <uicorner CornerRadius={new UDim(0, 4)} />],
                ]),
            }}
        />
        <uiaspectratioconstraint
            AspectRatio={1}
            AspectType={Enum.AspectType.FitWithinMaxSize}
            DominantAxis={Enum.DominantAxis.Width}
        />
        <uicorner 
            CornerRadius = {CornerRadius}
        />
        <uistroke 
            Color = {Color3.fromRGB(177, 94, 94)}
        />
        <Cursor {...CursorProperties} />
    </canvasgroup>
}

export default Joy;
