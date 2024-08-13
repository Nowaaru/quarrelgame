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

const scriptChildren = script.GetChildren();
let failedScript: Instance | undefined = undefined;

assert(
    scriptChildren.every((n) => (n.IsA("ModuleScript") ? true : (failedScript = n) === n ? false : true)),
    `instance ${failedScript} is not a ModuleScript (type ${typeOf(failedScript)}).`,
);
const Characters = new ReadonlyMap<string, Character.Character>(
    (scriptChildren as ModuleScript[]).map((v) => require(v) as Character.Character).map((n) => [n.Name, n]),
);

export default Characters;
