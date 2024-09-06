import { QGCharacter, EntityState, Input, Hitbox, Character, Skill, Animation, Motion, MotionInput, Entity, SkillLike } from "@quarrelgame-framework/common";
import { FarSlash, StandingKick, Heavy, LowHeavy, ForwardPunch } from "./normals";
import TotsugekiFlyHS from "./skills/skill-dependencies/totsugeki-heavy-fly";
import TotsugekiHS from "./skills/totsugeki-heavy";

@QGCharacter({
    id: "the grim reaper",
    skills: [
        [ [ Motion.Down, Motion.DownForward, Motion.Forward, Input.Heavy ], TotsugekiHS],
        [ [ Motion.Neutral, Input.Slash ], FarSlash     ],
        [ [ Motion.Neutral, Input.Kick  ], StandingKick ],
        [ [ Motion.Neutral, Input.Heavy ], Heavy        ],
        [ [ Motion.Down,    Input.Heavy ], LowHeavy     ],
        [ [ Motion.Forward, Input.Punch ], ForwardPunch ]
    ]
})
export default class DEATH implements Character.Character
{
    Name: string = "DEATH";
    Description: string = "gotsuteki";
    Header = "GOTSUTEKI";
    Subheader = "JUST KICK THE DOLPHIN";

    EaseOfUse: 1 | 2 | 3 | 4 | 5 = 3;

    Model = Character.GetCharacterModel<CharacterModels>().death;
    Setup = (incomingCharacter: Model) =>
    {
        // TODO: turn this into a decorator field please
        // god this is so annoying
        const dolphin = incomingCharacter.FindFirstChild("Dolphin") as BasePart;
        if (dolphin)

            dolphin.Transparency = 1;

    };

    Skills = new Map<MotionInput, SkillLike>();
    Archetype: Character.Archetype = Character.Archetype.Beatdown;
    RigType: Character.CharacterRigType = Character.CharacterRigType.Raw;
    
    Animations: Character.Animations = {
        [ EntityState.Idle ]: 
            new Animation.AnimationBuilder()
                .SetName("Idle")
                .SetAnimationId("rbxassetid://14487999316")
                .SetPriority(Enum.AnimationPriority.Idle)
                .SetLooped(true)
                .Construct(),
        [ EntityState.Crouch ]:
            new Animation.AnimationBuilder()
                .SetName("Crouch")
                .SetAnimationId("rbxassetid://14288051389")
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(true)
                .Construct(),
        [ EntityState.Walk ]:
            new Animation.AnimationBuilder()
                .SetName("Walk")
                .SetAnimationId("rbxassetid://14488005454")
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(true)
                .Construct(),
    };
}
