import { QGCharacter, EntityState, Input, Hitbox, Character, Skill, Animation, Motion, MotionInput } from "@quarrelgame-framework/common";
import { FarSlash, ForwardKick, Heavy, LowHeavy } from "./normals";

@QGCharacter({
    id: "the grim reaper"
})
export default class DEATH implements Character.Character
{
    Name: string = "DEATH";
    Description: string = "gotsuteki";
    Header = "GOTSUTEKI";
    Subheader = "JUST KICK THE DOLPHIN";

    EaseOfUse: 1 | 2 | 3 | 4 | 5 = 3;

    Model = Character.GetCharacterModel<CharacterModels>().death;

    Skills: ReadonlySet<Skill.Skill> = new ReadonlySet([
        new Skill.SkillBuilder()
            .SetName("Test Skill")
            .SetDescription("A test skill.")
            .SetFrameData(
                new Skill.FrameDataBuilder()
                    .SetAnimation(
                        new Animation.AnimationBuilder()
                            .SetName("Test Skill")
                            .SetAnimationId("rbxassetid://14280676559")
                            .SetPriority(Enum.AnimationPriority.Action)
                            .Construct(),
                    )
                    .SetStartup(4)
                    .SetActive(6)
                    .SetRecovery(-4)
                    .SetHitbox(
                        new Hitbox.HitboxBuilder()
                            .SetOffset()
                            .SetSize(new Vector3(7, 7, 7))
                            .Construct(),
                    ),
            )
            .SetMotionInput([Motion.Down, Motion.DownForward, Motion.Forward, Input.Slash]) // 236S
            .SetGaugeRequired(25)
            .SetGroundedType(Skill.SkillGroundedType.Ground)
            .SetReversal(false)
            .Construct(),
    ]);

    Archetype: Character.Archetype = Character.Archetype.Beatdown;
    Attacks: ReadonlyMap<MotionInput, Skill.Skill | (() => Skill.Skill)> = new ReadonlyMap([
        [ [ Motion.Neutral, Input.Slash ], FarSlash    ],
        [ [ Motion.Neutral, Input.Kick  ], ForwardKick ],
        [ [ Motion.Neutral, Input.Heavy ], Heavy       ],
        [ [ Motion.Down, Input.Heavy    ], LowHeavy    ]
    ]);

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
