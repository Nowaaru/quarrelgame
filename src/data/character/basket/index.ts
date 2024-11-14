// idle: 93505672243585;
import { QGCharacter, EntityState, Input, Hitbox, Character, Skill, Animation, Motion, MotionInput, Entity, SkillLike } from "@quarrelgame-framework/common";
import { ICharacterR6 } from "@quarrelgame-framework/types";
import YoyoOffensive from "./skills/yoyo-offensive";
import RollingMovement from "./skills/spin";

@QGCharacter({
    id: "basket",
    skills: [ 
        [[ Motion.Down, Motion.DownForward, Motion.Forward, Input.Slash ], YoyoOffensive],
        [[ Motion.Down, Motion.DownBack, Motion.Back, Input.Slash ], RollingMovement]
    ],
    setup: (baller) =>
    {
        const yoyoList = (baller as ICharacterR6).GetDescendants().filter((e) => !!e.Parent?.Name.match("Arm")[0] && !!e.Name.lower().match("rightyoyo")[0])
        yoyoList.forEach((e) => e.IsA("BasePart") ? e.Transparency = 1 : undefined);
    }
})
export default class basket implements Character.Character
{
    Name: string = "basket";
    Description: string = "uh oh";
    Header = "ROGER ROGER";
    Subheader = "DO NOT GET HUGGED.";

    EaseOfUse: 1 | 2 | 3 | 4 | 5 = 3;

    Model = Character.GetCharacterModel<CharacterModels>().basket;

    Skills = new Map<MotionInput, SkillLike>();
    Archetype: Character.Archetype = Character.Archetype.Technical;
    RigType: Character.CharacterRigType = Character.CharacterRigType.Raw;
    
    Animations: Character.Animations = {
        [ EntityState.Idle ]: 
            new Animation.AnimationBuilder()
                .SetName("Idle")
                .SetAnimationId("rbxassetid://93505672243585")
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
        [EntityState.Landing]:
            new Animation.AnimationBuilder()
                .SetName("Land")
                .SetAnimationId("rbxassetid://81632743307571")
                .SetPriority(Enum.AnimationPriority.Action)
                .SetLooped(false)
                .Construct(),

    };
}
