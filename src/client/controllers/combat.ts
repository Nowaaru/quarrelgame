import { Controller, OnTick, OnStart } from "@flamework/core";
import { CombatController2D, KeyboardEvents, MatchController, MotionInputHandling, OnMatchRespawn } from "@quarrelgame-framework/client";
import { CharacterManager, GetInputFromInputState, GetInputModeFromInputState, GetMotionFromInputState, Input, InputMode, Motion, MotionInput, SkillManager, validateMotion } from "@quarrelgame-framework/common"
import { QGCharacterController } from "./character";
import { Input  as InputController } from "@quarrelgame-framework/client";
import { Client } from "./client";
import character from "data/character";

/*
 * TODO: automatically implement these 
 * interfaces (less boilerplate = more awesome)
 */
@Controller({})
export class Combat extends CombatController2D implements OnStart, OnTick, KeyboardEvents, MotionInputHandling, OnMatchRespawn 
{
    constructor(protected readonly client: Client, protected readonly characterController: QGCharacterController, protected readonly matchController: MatchController, protected readonly inputController: InputController, protected readonly characterManager: CharacterManager, protected readonly skillManager: SkillManager) {
        super(client, characterController, matchController, inputController, skillManager);

        this.keybindMap = new Map<Enum.KeyCode, Input>([
            [Enum.KeyCode.Zero, Input.Roman],
            [Enum.KeyCode.Backspace, Input.Burst],
            [Enum.KeyCode.LeftBracket, Input.Slash],
            [Enum.KeyCode.Semicolon, Input.Punch],
            [Enum.KeyCode.Return, Input.Kick],
            [Enum.KeyCode.RightBracket, Input.Heavy],
            [Enum.KeyCode.Quote, Input.Dust],
            [Enum.KeyCode.LeftShift, Input.Dash]
        ]);
    }

    onRespawn(character: Model): void {
        super.onMatchRespawn(character);
        print("on respawn!!");
    }

    // override onTick()
    // {
    //     return;
    // }

    onMotionInputChanged(motionInput: MotionInput): void {
        warn("Motion Input Changed:", 
             motionInput.map(([input,timeHit]) => {
                const maybeMotion = GetMotionFromInputState(input);
                const maybeInput = GetInputFromInputState(input);
                // we don't use the mode from maybeInput
                // because motions have input modes as well
                const maybeMode = GetInputModeFromInputState(input);
                
                return {
                        motion: maybeMotion ? Motion[maybeMotion] ?? "<Unknown>" : "<None>",
                        input: maybeInput ? Input[maybeInput[0]] ?? "<Unknown>" : "<None>",
                        mode: maybeMode ? InputMode[maybeMode] : "<Unknown>",
                        timeHit
                } }));

        if (bit32.btest(motionInput[motionInput.size() - 1]?.[0] ?? InputMode.Release, InputMode.Release))

            return;

        const Character = this.characterController.GetEntity();
        const CharacterId = Character?.attributes.CharacterId;
        if (CharacterId)
        {
            print("character id:", CharacterId, "characters:", character);

            // Sort validated motions to sort from input length and then complexity (higher average value = higher complexity)
            const characterData = this.characterManager.GetCharacter(CharacterId);
            const lastSkill = Character.attributes.PreviousSkill;
            let validatedMotions: ReturnType<typeof validateMotion>;



            if (Character.IsNegative())
            {
                assert(lastSkill, "last skill not found");
                const { Rekkas, Gatlings } = this.skillManager.GetSkill(lastSkill)!;

                validatedMotions = validateMotion(this.currentMotion, { Skills: new Map([...Gatlings, ...Rekkas ]) }, 
                                              { castingEntity: Character, targetEntities: new Set(), closeEnemies: [], closeFriendlies: []})
            } else validatedMotions = validateMotion(this.currentMotion, characterData!,
                                              { castingEntity: Character, targetEntities: new Set(), closeEnemies: [], closeFriendlies: []})
            if (validatedMotions.size() > 0)
            {
                const getAvg = (arr: MotionInput) => arr.reduce((e,[a]) => e + a, 0) / arr.size();
                validatedMotions.sort(([a], [b]) =>
                {
                   const avg_a = getAvg(a),
                         avg_b = getAvg(b);

                   const size_a = a.size(),
                         size_b = b.size();

                   return size_a === size_b ? avg_a > avg_b : size_a > size_b; // in reverse, largest should come before smallest
                });

                warn("sorted validated motions:", validatedMotions);
                Character.ExecuteSkill(validatedMotions.mapFiltered(([,a]) => this.skillManager.IdFromSkill(a)))
                this.Reset();
            }
        } else warn("no entity");
    }
}
