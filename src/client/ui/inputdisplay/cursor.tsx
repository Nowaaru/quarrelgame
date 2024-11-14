import { BindingOrValue, getBindingValue, toBinding, useMotion } from "@rbxts/pretty-react-hooks";
import React, { useCallback, useEffect } from "@rbxts/react";

export interface CursorProps {
    ButtonDisplay?: {
        Label: BindingOrValue<string>;
        Color: BindingOrValue<Color3>;
    };

    BackgroundColor?: BindingOrValue<Color3>;
    Position: BindingOrValue<UDim2>;
    Size: BindingOrValue<number>,

    key?: string;
}

export function Cursor({
    ButtonDisplay,
    BackgroundColor = Color3.fromRGB(128, 128, 128),
    Size,
    Position,
    key,
}: CursorProps) 
{
    const basePadding = new UDim(0, 2);
    const secondaryPadding = new UDim(0, 1);
    const [sizeData, motion] = useMotion(0)

    useEffect(() =>
    {
        motion.immediate(0)

        if (ButtonDisplay)
        {
            motion.tween(1, {
                time: 0.1,
                style: Enum.EasingStyle.Sine,
                direction: Enum.EasingDirection.InOut
            });
        }
    }, [ButtonDisplay])

    return (
        <canvasgroup
            Size={toBinding(Size).map((e) => UDim2.fromOffset(e,e))}
            Position={toBinding(Position)}
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
                Size={sizeData.map((e) => UDim2.fromScale(e,e))}
                Rotation={0}
                BackgroundColor3={toBinding(ButtonDisplay?.Color ?? BackgroundColor)}
                Text={toBinding(ButtonDisplay?.Label ?? "")}
                FontFace={Font.fromEnum(Enum.Font.FredokaOne)}
                TextSize={sizeData.map((e) => e * 13.5)}
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
