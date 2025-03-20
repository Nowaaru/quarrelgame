// idle: 93505672243585;
import { QGCharacter, EntityState, Input, Hitbox, Character, Skill, Animation, Motion, MotionInput, Entity, SkillLike } from "@quarrelgame-framework/common";
import { ICharacterR6 } from "@quarrelgame-framework/types";
import YoyoOffensive from "./skills/yoyo-offensive";

import RollingMovement from "./skills/rolling-movement";
import StandingKick from "./normals/5k";

import CloseSlash from "./normals/cs";
import FarSlash from "./normals/fs";

import CrouchingKick from "./normals/2k";
import CrouchingPunch from "./normals/2p";
import CrouchingHeavy from "./normals/2h";
import CrouchingSlash from "./normals/2s";
import StandingPunch from "./normals/5p";
import ForwardKick from "./normals/6k";
import HeavySlash from "./normals/5h";

const CLOSE_SLASH_RANGE = 16;
@QGCharacter({
    id: "basket",
    skills: [ 
        [[ Motion.Down, Motion.DownForward, Motion.Forward, Motion.Forward | Input.Slash ], YoyoOffensive],
        [[ Motion.Down, Motion.DownBack, Motion.Back, Motion.Back | Input.Kick ], RollingMovement],

        [[ Motion.Down | Input.Kick], CrouchingKick],
        [[ Motion.Down | Input.Punch], CrouchingPunch],
        [[ Motion.Down | Input.Heavy], CrouchingHeavy],
        [[ Motion.Down | Input.Slash], CrouchingSlash],

        [[ Motion.Forward | Input.Kick ], ForwardKick ],

        [[ Input.Kick ], StandingKick ],
        [[ Input.Punch ], StandingPunch ],
        [[ Input.Heavy ], HeavySlash],
        [[ Input.Slash ], ({closeEnemies}) => 
        {
            if (closeEnemies.size() > 0)

                return CloseSlash

            else 

                return FarSlash
        }],
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
                .SetAnimationId("rbxassetid://96287370938132")
                .SetPriority(Enum.AnimationPriority.Idle)
                .SetLooped(true)
                .Construct(),
        [ EntityState.Crouch ]:
            new Animation.AnimationBuilder() 
                .SetName("Crouch")
                .SetAnimationId("rbxassetid://71664244638862")
                .LinksInto(
                    new Animation.AnimationBuilder()
                        .SetName("CrouchHold")
                        .SetAnimationId("rbxassetid://71664244638862")
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
                .SetAnimationId("rbxassetid://138193871930986")
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(true)
                .Construct(),
        [ EntityState.Jumping ]:
            new Animation.AnimationBuilder()
                .SetName("JumpStart")
                .SetAnimationId("rbxassetid://131669916641213")
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(false)
                .Construct(),
        [ EntityState.Midair ]:
            new Animation.AnimationBuilder()
                .SetName("JumpMidair")
                .SetAnimationId("rbxassetid://112745987087353")
                .SetPriority(Enum.AnimationPriority.Movement)
                .SetLooped(false)
                    .LinksInto(
                        new Animation.AnimationBuilder()
                            .SetName("JumpMidairIdle")
                            .SetAnimationId("rbxassetid://125106233250434")
                            .SetPriority(Enum.AnimationPriority.Movement)
                            .SetLooped(true)
                            .Construct()
                    )
                .Construct(),
        [EntityState.Landing]:
            new Animation.AnimationBuilder()
                .SetName("Land")
                .SetAnimationId("rbxassetid://134104429277823")
                .SetPriority(Enum.AnimationPriority.Action)
                .SetLooped(false)
                .Construct(),

    };
}
