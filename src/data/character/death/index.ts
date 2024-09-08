import { QGCharacter, EntityState, Input, Hitbox, Character, Skill, Animation, Motion, MotionInput, Entity, SkillLike } from "@quarrelgame-framework/common";
import { FarSlash, StandingKick, Heavy, LowHeavy, ForwardPunch } from "./normals";
import TotsugekiHS from "./skills/totsugeki-heavy";
import TotsugekiS from "./skills/totsugeki-light";
import AnchorSlide from "./skills/anchor-slide";

@QGCharacter({
    id: "the grim reaper",
    skills: [
        [ [ Motion.Down, Motion.DownForward, Motion.Forward, Input.Heavy ], TotsugekiHS],
        [ [ Motion.Down, Motion.DownForward, Motion.Forward, Input.Slash ], TotsugekiS],
        [ [ Motion.Down, Motion.Down, Input.Kick ], AnchorSlide],
        [ [ Motion.Neutral, Input.Slash ], FarSlash     ],
        [ [ Motion.Neutral, Input.Kick  ], StandingKick ],
        [ [ Motion.Neutral, Input.Heavy ], Heavy        ],
        [ [ Motion.Down,    Input.Heavy ], LowHeavy     ],
        [ [ Motion.Forward, Input.Punch ], ForwardPunch ]
    ],
    setup: (death_itself) =>
    {
        const dolphin = death_itself.FindFirstChild("Dolphin") as BasePart;
        if (dolphin)

            dolphin.Transparency = 1;
    }
})
export default class DEATH implements Character.Character
{
    Name: string = "DEATH";
    Description: string = "gotsuteki";
    Header = "GOTSUTEKI";
    Subheader = "JUST KICK THE DOLPHIN";

    EaseOfUse: 1 | 2 | 3 | 4 | 5 = 3;

    Model = Character.GetCharacterModel<CharacterModels>().death;

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
                .SetAnimationId("rbxassetid://101279523463524")
                .LinksInto(
                    new Animation.AnimationBuilder()
                        .SetName("CrouchHold")
                        .SetAnimationId("rbxassetid://103639389253526")
                        .SetPriority(Enum.AnimationPriority.Movement)
                        .SetLooped(true)
                        .Construct()
                )
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(false)
                .Construct(),
        [ EntityState.Walk ]:
            new Animation.AnimationBuilder()
                .SetName("Walk")
                .SetAnimationId("rbxassetid://14488005454")
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(true)
                .Construct(),
        [ EntityState.Jumping ]:
            new Animation.AnimationBuilder()
                .SetName("JumpStart")
                .SetAnimationId("rbxassetid://84998583229461")
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(false)
                .Construct(),
        [ EntityState.Midair ]:
            new Animation.AnimationBuilder()
                .SetName("JumpMidair")
                .SetAnimationId("rbxassetid://77360677996004")
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(false)
                    .LinksInto(
                        new Animation.AnimationBuilder()
                            .SetName("JumpMidairIdle")
                            .SetAnimationId("rbxassetid://122284459150216")
                            .SetPriority(Enum.AnimationPriority.Movement)
                            .SetLooped(true)
                            .Construct()
                    )
                .Construct(),
    };
}
