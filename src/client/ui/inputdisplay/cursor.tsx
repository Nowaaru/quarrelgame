import Roact from "@rbxts/roact";

export interface CursorProps {
    ButtonDisplay?: {
        Label: string;
        Color: Color3;
    };

    BackgroundColor?: Color3;
    Size?: UDim2;
    Position?: UDim2;

    key?: string;
}

export function Cursor({
    ButtonDisplay,
    BackgroundColor = Color3.fromRGB(171, 68, 68),
    Size = UDim2.fromOffset(32,32),
    Position = UDim2.fromScale(),
    key = tostring({}),
}: CursorProps) 
{
    const basePadding = new UDim(0, 2);
    const secondaryPadding = new UDim(0, 1);

    return (
        <canvasgroup
            Size={Size}
            Position={Position.add(UDim2.fromScale(0.5, 0.5))}
            SizeConstraint={Enum.SizeConstraint.RelativeXX}
            AnchorPoint={new Vector2(0.5, 0.5)}
            key={key}
        >
            <uicorner CornerRadius={new UDim(1, 0)} />
            <uipadding
                PaddingBottom={basePadding}
                PaddingLeft={basePadding}
                PaddingRight={basePadding}
                PaddingTop={basePadding}
            />
            <canvasgroup key="ButtonFill">
                <uipadding
                    PaddingBottom={secondaryPadding}
                    PaddingLeft={secondaryPadding}
                    PaddingRight={secondaryPadding}
                    PaddingTop={secondaryPadding}
                />
                {ButtonDisplay ? (
                    <textlabel
                        Position={new UDim2()}
                        Size={UDim2.fromScale(1, 1)}
                        Rotation={0}
                        BackgroundColor3={BackgroundColor}
                        FontFace={Font.fromEnum(Enum.Font.FredokaOne)}
                        TextColor3={new Color3(1, 1, 1)}
                        key="PressedButton"
                    >
                        <uicorner CornerRadius={new UDim(1, 0)} />
                        <uistroke Thickness={2} />
                    </textlabel>
                ) : undefined}
            </canvasgroup>
        </canvasgroup>
    );
}

export default Cursor;
