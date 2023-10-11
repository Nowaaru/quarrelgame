import { Character } from "@rbxts/quarrelgame-framework";
type CharacterRig = Character.CharacterRig;

declare global {
    interface CharacterModels {
        jane: CharacterRig,
        brighteyes: CharacterRig,
        dusek: CharacterRig,
        death: CharacterRig,
        shedletsky: CharacterRig,
        roblox: CharacterRig
    }
}
