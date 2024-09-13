import React, { Children, useEffect, useMemo, useRef, useState } from "@rbxts/react";
import Cursor, { CursorProps } from "./cursor";
import Dots from "./dots";
import { BindingOrValue, toBinding, useMotion } from "@rbxts/pretty-react-hooks";
import { Motion as MotionEnum, Input as InputEnum, ConvertMotionToMoveDirection } from "@quarrelgame-framework/common";

interface Joy extends React.PropsWithChildren {
    CursorProperties?: Omit<CursorProps, "Position">,
    Size?: UDim2;
    Position?: UDim2;
    CornerRadius?: UDim;
    DotsArea?: number;
    DotSize?: number;

    Motion: BindingOrValue<MotionEnum>,
    Input: BindingOrValue<InputEnum | undefined>

    key?: string
}

const GGButtons = {
    [InputEnum.Punch]: Color3.fromHex("#FE8CFE"),
    [InputEnum.Kick]: Color3.fromHex ("#66CEFF"),
    [InputEnum.Slash]: Color3.fromHex("#36ECA0"),
    [InputEnum.Heavy]: Color3.fromHex("#FD3030"),
    [InputEnum.Dust]: Color3.fromHex ("#FF9B30")
}

const defaultCursorSize = 20;
export function Joy(Props: Joy)
{
    const {
        CursorProperties = { Size: defaultCursorSize },
        Size = UDim2.fromScale(0.292, 0.874), 
        CornerRadius = new UDim(0, 4),

        Input, 
        Motion = MotionEnum.Neutral,
        DotSize = 8, 
        children,
    } = Props;
    const dotsGuiObjectRef = useRef<Frame>();

    /* motion direction for the cursor, adjusted to the dots. */
    const [cursorPosition, setCursorPosition] = useState(UDim2.fromScale(0.5, 0.5));
    const [interpolatedCursorPositionBinding, motionState] = useMotion({x: 0.5, y: 0.5})
    useEffect(() =>
    {
        const motionDirection = toBinding(Motion).map(ConvertMotionToMoveDirection).getValue();
        
        setCursorPosition((currentPosition) =>
        {
            let dotsSizeScaledX = 0, dotsSizeScaledY = 0;
            let cursorSizeScaledX = 0, cursorSizeScaledY = 0
            
            if (dotsGuiObjectRef.current)
            {
                const adjust = (size: BindingOrValue<number>) => (["X", "Y"] as const).map((dir) => motionDirection[dir] !== 0 ? (-math.sign(motionDirection[dir]) * ( toBinding(size).getValue() / dotsGuiObjectRef.current!.AbsoluteSize[dir])) : 0);

                [dotsSizeScaledX, dotsSizeScaledY] = adjust(DotSize / 2);
                [cursorSizeScaledX, cursorSizeScaledY] = adjust(CursorProperties.Size ?? defaultCursorSize);
            } 

            const newPosition = UDim2.fromScale(motionDirection.X + cursorSizeScaledX - dotsSizeScaledX, -motionDirection.Y - cursorSizeScaledY + dotsSizeScaledY);
            if (currentPosition !== newPosition)

                return newPosition.add(UDim2.fromScale(0.5, 0.5))


            return currentPosition
        });
    },
    [toBinding(Motion), dotsGuiObjectRef.current])


    useEffect(() =>
    {
        motionState.spring({x: cursorPosition.X.Scale, y: cursorPosition.Y.Scale}, { tension: 600, friction: 34, mass: 0.7 });
    })

    return <frame
        Size = {Size}
        Position = {UDim2.fromScale(0, 0.5)}
        BackgroundColor3={Color3.fromRGB(42,42,42)}
        SizeConstraint = {Enum.SizeConstraint.RelativeXX}
        AnchorPoint = {new Vector2(0, 0.5)}
        key = {Props.key ?? "Joy"}
        ref={dotsGuiObjectRef}
    >
        <Cursor 
            Position={interpolatedCursorPositionBinding.map((e) => UDim2.fromScale(e.x, e.y))}
            ButtonDisplay={
                toBinding(Input).map((e) => 
                     e && GGButtons[e as never] ? 
                        {
                            Label: e,
                            Color: GGButtons[e as never]
                        } 
                      : undefined).getValue()
            }
            key="ligma cursor"
            {...CursorProperties} 
        />
            
        <Dots 
            GuiObject={dotsGuiObjectRef} 
            BackgroundColor3={Color3.fromRGB(22,22,22)}>
            <uicorner key="corner" CornerRadius={new UDim(0, 4)} />
        </Dots>

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
        {children}
    </frame>
}

export default Joy;
