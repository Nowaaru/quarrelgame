import { Entity } from "@quarrelgame-framework/common";
import { YOYO_TYPE } from "shared/components/yoyo.component";

export default new class {
    private yoyoWielders: Map<Entity, MeshPart> = new Map();
    private getSpinners: Map<Entity, Vector3> = new Map();

    public registerYoyo(character: Entity, instance: MeshPart)
    {
        if (!this.canRegisterYoyo(character))
        {
            const yoyo = this.yoyoWielders.get(character)!;
            throw `Yoyo wielder ${character.instance.Name} already has an ${YOYO_TYPE[yoyo.GetAttribute("Type") as never].lower()} yoyo out.`
        }
        
        this.yoyoWielders.set(character, instance);
    }

    public getYoyo(character: Entity)
    {
        if (this.canRegisterYoyo(character))

            return;

        return this.yoyoWielders.get(character);
    }

    public canRegisterYoyo(character: Entity)
    {
        const yoyo = this.yoyoWielders.get(character);
        if (yoyo && yoyo.Parent)

            return false;

        return true;
    }
};
