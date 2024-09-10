
import Object from "@rbxts/object-utils";
import { BindingOrValue, getBindingValue } from "@rbxts/pretty-react-hooks"

export type PositionValues = {[k in (keyof typeof DisplayPositionVertical | keyof typeof DisplayPositionHorizontal)]?: UDim2};

export enum DisplayPositionVertical
{
    Top = 0x1,
    Middle = 0x2,
    Bottom = 0x4,
}

export enum DisplayPositionHorizontal
{
    Left = 0x8,
    Center = 0x10,
    Right = 0x20,
}

export class DisplayPosition {
    private positionValues!: PositionValues;

    public GetPosition(positionBitFlag: number)
    {
        let outUD2 = new UDim2();
        const positionValues = this.positionValues;
        for (const key of Object.keys(positionValues))
        {
            const valueToAdd = (DisplayPositionHorizontal[key as keyof typeof DisplayPositionHorizontal] as number ?? DisplayPositionVertical[key as keyof typeof DisplayPositionVertical] as number);
            if (bit32.btest(positionBitFlag & valueToAdd))

                outUD2 = outUD2.add(positionValues[key]!)

            print(positionBitFlag, valueToAdd)

        }
        return outUD2;
    }
    constructor(displayPosition: BindingOrValue<PositionValues | Map<keyof PositionValues, PositionValues[keyof PositionValues]> | [keyof PositionValues, PositionValues[keyof PositionValues]][]>)
    {
        displayPosition = getBindingValue(displayPosition)
        if ("Top" in displayPosition)
        {
            this.positionValues = displayPosition;

            return this;
        }

        displayPosition = [...displayPosition as Map<keyof PositionValues, PositionValues[keyof PositionValues]>];
        const outDisplayValues: PositionValues = {};
        for (const [key, value] of displayPosition)

            outDisplayValues[key] = value;

        this.positionValues = outDisplayValues;
    }
}
