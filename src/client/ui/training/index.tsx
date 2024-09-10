import React, { useMemo, useState } from "@rbxts/react";
import { BindingOrValue, toBinding } from "@rbxts/pretty-react-hooks";
import { Input, Motion } from "@quarrelgame-framework/common";

import InputDisplay from "../inputdisplay";
import { DisplayPosition, DisplayPositionVertical, PositionValues } from "util/react";

// TODO: integrate new training controller
// with new roact and then have this be the
// "root page" for all training ui (like
// training options)
interface TrainingOptions
{
    Input: BindingOrValue<Input | undefined>
    Motion: BindingOrValue<Motion>

    InputDisplayEnabled?: boolean,
    BFInputDisplayPosition?: number,

    InputListEnabled?: boolean,
    BFInputListPosition?: number;
}




export function Training({
    Input: proposedInput,
    Motion: proposedMotion,

    InputDisplayEnabled = false,
    BFInputDisplayPosition = DisplayPositionVertical.Middle,


    InputListEnabled = true,
    BFInputListPosition,
}: TrainingOptions)
{
    const [inputDisplayPosition, setInputDisplayPosition] = useState(new DisplayPosition({
        Top:    UDim2.fromScale(0, 0.25),
        Middle: UDim2.fromScale(0, 0.5),
        Bottom: UDim2.fromScale(0, 0.7625),

        Left:   UDim2.fromScale(0.05, 0),
        Center: UDim2.fromScale(0.5,  0),
        Right:  UDim2.fromScale(0.95, 0),
    }))

    const displayPosition = useMemo(() => 
        inputDisplayPosition.GetPosition(BFInputDisplayPosition), 
    [inputDisplayPosition])

    proposedInput = toBinding(proposedInput);
    proposedMotion = toBinding(proposedMotion);

    return (
        <frame
            BackgroundTransparency={1}
            Size={UDim2.fromScale(1,1)}
            key="TrainingUI"
        >
            <InputDisplay 
                AnchorPoint={new Vector2(0, 0.5)}
                BackgroundTransparency={0.25}
                Position={displayPosition} 

                Motion={proposedMotion} 
                Input={proposedInput}
            />
        </frame>
    )
}

export default Training;
