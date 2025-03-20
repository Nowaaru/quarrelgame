import { Entity } from "@quarrelgame-framework/common";

export enum YOYO_TYPE {
    PASSIVE,
    DEFENSIVE,
    OFFENSIVE,
}

export default new class {
    private yoyoWielders: Map<Entity, MeshPart> = new Map();
    private yoyos: Map<MeshPart, Entity> = new Map();

    public registerYoyo(character: Entity, instance: MeshPart)
    {
        // FIXME: memory leak-prone
        if (!this.canRegisterYoyo(character))
        {
            const yoyo = this.yoyoWielders.get(character)!;
            throw `Yoyo wielder ${character.instance.Name} already has an ${YOYO_TYPE[yoyo.GetAttribute("Type") as never].lower()} yoyo out.`
        }
        
        this.yoyos.set(instance, character);
        this.yoyoWielders.set(character, instance);
    }

    public unregisterYoyo(yoyo: MeshPart)
    {

        const entity = this.fromYoyo(yoyo);
        if (entity)
        {
            this.yoyoWielders.delete(entity);
            this.yoyos.delete(yoyo);
        }
    }

    public getYoyo(character: Entity)
    {
        if (this.canRegisterYoyo(character))

            return;

        return this.yoyoWielders.get(character);
    }

    public fromYoyo(yoyo: MeshPart)
    {
        return this.yoyos.get(yoyo);
    }

    public canRegisterYoyo(character: Entity)
    {
        const yoyo = this.yoyoWielders.get(character);
        if (yoyo && yoyo.Parent)

            return false;

        return true;
    }
};
