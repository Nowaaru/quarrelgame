import { BindingOrValue, getBindingValue, toBinding } from "@rbxts/pretty-react-hooks";
import React, { useCallback } from "@rbxts/react";

export interface CursorProps {
    ButtonDisplay?: {
        Label: string;
        Color: Color3;
    };

    BackgroundColor?: Color3;
    Size?: number,
    Position?: BindingOrValue<UDim2>;

    key?: string;
}

export function Cursor({
    ButtonDisplay,
    BackgroundColor = Color3.fromRGB(171, 68, 68),
    Size = 16,
    Position = UDim2.fromScale(),
    key,
}: CursorProps) 
{
    const basePadding = new UDim(0, 2);
    const secondaryPadding = new UDim(0, 1);
    const calculateSizeAdjustment = useCallback((position) => (-math.sign(position) * (Size)), []);
    Position = getBindingValue(Position)
    print(Position)

    return (
        <canvasgroup
            Size={UDim2.fromOffset(Size,Size)}
            Position={Position.add(UDim2.fromScale(0.5, 0.5)).add(UDim2.fromOffset(calculateSizeAdjustment(Position.X.Scale), calculateSizeAdjustment(Position.Y.Scale)))}
            BackgroundColor3={BackgroundColor}
            SizeConstraint={Enum.SizeConstraint.RelativeXX}
            AnchorPoint={new Vector2(0.5, 0.5)}
            ZIndex={2}
            key={key}
        >
            <uicorner CornerRadius={new UDim(1, 0)} />
            <uipadding
                PaddingBottom={basePadding}
                PaddingLeft={basePadding}
                PaddingRight={basePadding}
                PaddingTop={basePadding}
            />
            <uipadding
                PaddingBottom={secondaryPadding}
                PaddingLeft={secondaryPadding}
                PaddingRight={secondaryPadding}
                PaddingTop={secondaryPadding}
            />
            <textlabel
                Position={UDim2.fromScale(0.5, 0.5)}
                Size={UDim2.fromScale(1, 1)}
                Rotation={0}
                BackgroundColor3={ButtonDisplay?.Color ?? BackgroundColor}
                Text={ButtonDisplay?.Label ?? ""}
                FontFace={Font.fromEnum(Enum.Font.FredokaOne)}
                TextSize={16}
                TextColor3={new Color3(1, 1, 1)}
                AnchorPoint={new Vector2(0.5,0.5)}
                key="PressedButton"
            >
                <uicorner CornerRadius={new UDim(1, 0)} />
                <uistroke Thickness={2} />
            </textlabel>
        </canvasgroup>
    );
}

export default Cursor;
