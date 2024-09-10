import React, { Children, useEffect, useMemo, useRef, useState } from "@rbxts/react";
import Cursor, { CursorProps } from "./cursor";
import Dots from "./dots";
import { Dependency } from "@flamework/core";
import { Combat } from "client/controllers/combat";
import { BindingOrValue, isBinding, toBinding, useMotion, useSpring } from "@rbxts/pretty-react-hooks";
import { Motion as MotionEnum, Input as InputEnum, ConvertMotionToMoveDirection } from "@quarrelgame-framework/common";
import { getBindingValue } from "@rbxts/pretty-react-hooks";

/* TODO: */
// Use Pretty-Roact-Hooks to get motors
// which we can use for interpolating.
//   
// After that, switch to React and use 
// Pretty-React-Hooks.

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
export function Joy(Props: Joy)
{
    const {
        CursorProperties,
        Size = UDim2.fromScale(0.292, 0.874), 
        CornerRadius = new UDim(0, 4),

        Input, 
        Motion = MotionEnum.Neutral,
        DotSize = 8, 
        children,
    } = Props;

    const motionAsBinding = toBinding(Motion);
    const dotsGuiObjectRef = useRef<Frame>();
    const motionDirection = useMemo(() =>
    {
        const dir = ConvertMotionToMoveDirection(getBindingValue(motionAsBinding.getValue()));
        const v2Direction = new Vector2(dir.X, -dir.Y)

        return v2Direction
    }, [motionAsBinding.getValue(), Input]);

    /* motion direction for the cursor, clamped to the dots. */
    const [motionPositionBinding, motion] = useMotion(new UDim2())

    const cursorPosition = useMemo(() => {
        const rawDirection = UDim2.fromScale(motionDirection.X, motionDirection.Y)
        if (!dotsGuiObjectRef.current)

            return rawDirection;

        const { AbsolutePosition: CanvasPosition, AbsoluteSize: CanvasSize } = dotsGuiObjectRef.current;
        const PointInJoyBox = CanvasPosition.add(CanvasSize.mul(motionDirection));

        print(rawDirection, PointInJoyBox)
        const [shortestDotDistance, closestDotToPosition] = (dotsGuiObjectRef.current!.GetChildren()
            .filter((e) => e.IsA("GuiObject")) as GuiObject[])
            .filter((e) => !!e.Name.find("Dot(%d)"))
            .reduce<readonly [number, GuiObject | undefined]>(([shortestDistance, closestDot], currentDot, i) =>
            {
                const maybeShortestDistance = (PointInJoyBox.sub(currentDot.AbsolutePosition)).Magnitude;
                if (!closestDot)

                    return [maybeShortestDistance, currentDot]

                return maybeShortestDistance < shortestDistance ? [maybeShortestDistance, currentDot] : [shortestDistance, closestDot];
            }, [0, undefined]);

        return new UDim2(motionDirection.X, -motionDirection.Sign().X * (DotSize / 2), motionDirection.Y, -motionDirection.Sign().Y * (DotSize / 2));
    }, [motionDirection])

    const inputBindingValue = getBindingValue(Input)
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
            Position={cursorPosition}
            ButtonDisplay={inputBindingValue ? {
                Label: tostring(inputBindingValue),
                Color: Color3.fromHSV(math.random(359), 154, 171),
            }: undefined}
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
