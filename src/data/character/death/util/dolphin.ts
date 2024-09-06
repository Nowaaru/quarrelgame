import { Entity } from "@quarrelgame-framework/common";

export function HideDolphin(entity: Entity) 
{
    const entityDolphin = entity.instance.FindFirstChild("Dolphin") as BasePart;
    if (entityDolphin) 

        entityDolphin.Transparency = 1;
}


export function ShowDolphin(entity: Entity) 
{
    const entityDolphin = entity.instance.FindFirstChild("Dolphin") as BasePart;
    if (entityDolphin) 

        entityDolphin.Transparency = 0;
}
