import { Animation, Skill, Hitbox, Motion, Input, QuarrelAssets, Character } from "@quarrelgame-framework/common";
import yoyoState from "../util/yoyo-state";
import YoyoComponent, { YOYO_TYPE } from "shared/components/yoyo.component";
import { Dependency } from "@flamework/core";
import { Components } from "@flamework/components";
import { RunService } from "@rbxts/services";
const startupFrames = 13;

export const RollingMovement = new Skill.SkillBuilder()
    .SetName("Rolling Movement")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetLink(new Skill.SkillBuilder()
             .SetName("Rolling Movement - Spin")
             .SetGroundedType(Skill.SkillGroundedType.AirOk)
             .SetFrameData(
                 new Skill.FrameDataBuilder()
                 .SetStartup(6) // cant attack instantly out of spin
                 .SetActive(128) // TODO: make this math.huge once i can confirm that it wont break the framework
                 .SetHitbox(
                     new Hitbox.HitboxBuilder()
                         .SetOffset(new Vector3(0, 0, 0))
                         .SetSize(new Vector3(0, 0, 0))
                         .Construct(),
                 )
                 .SetAnimation(
                     new Animation.AnimationBuilder()
                     .IsAttack()
                     .SetName("214K - 2")
                     .SetAnimationId("rbxassetid://89714756590845")
                     .SetPriority(Enum.AnimationPriority.Action2)
                     .SetLooped(true)
                     .Construct()
                 )
                .SetEffectAtFrame(24, (entity, skill) =>
                {
                    if (!yoyoState.canRegisterYoyo(entity))
                    {
                        entity.instance.PivotTo(CFrame.lookAlong(yoyoState.getYoyo(entity)!.Position, entity.instance.GetPivot().LookVector));
                    }
                })
             )
             .Construct())
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(startupFrames)
            .SetActive(0)
            .SetRecovery(0)
            .SetContact(0) 
            .SetBlockAdvantage(0)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 0))
                    .SetSize(new Vector3(0, 0, 0))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("214K")
                    .SetAnimationId("rbxassetid://97999922106053")
                    .SetPriority(Enum.AnimationPriority.Action)
                    .Construct(),
            ),
    )
    .Construct();

export default RollingMovement;
