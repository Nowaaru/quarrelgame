import { Character } from "@quarrelgame-framework/common";
type CharacterRig = Character.CharacterRig;

export interface CharacterModel {
    jane: CharacterRig;
    roblox: CharacterRig;
    shedletsky: CharacterRig;
    dusek: CharacterRig;
    brighteyes: CharacterRig;
    death: CharacterRig;
}

export default new ReadonlyMap<string, Character.Character>();
