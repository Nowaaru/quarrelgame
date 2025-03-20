import { QGSkill, Animation, Skill, Hitbox, Entity } from "@quarrelgame-framework/common";
import { Workspace } from "@rbxts/services";

import Make from "@rbxts/make";
import Spin from "./spin";

import yoyoState from "../../util/yoyo-state";

const startupFrames = 13;

const getGravityVelocityForce = (entity: Entity, gravityPercentage = 1) =>
    new Vector3(0, Workspace.Gravity * entity.GetPrimaryPart().AssemblyMass * gravityPercentage, 0);

const makeGravityVelocity = (entity: Entity, gravityPercentage = 0.9) => 
{
    return Make("VectorForce", 
    {
        Enabled: false,
        ApplyAtCenterOfMass: true,
        Force: getGravityVelocityForce(entity, gravityPercentage), 
        RelativeTo: Enum.ActuatorRelativeTo.World,
        Attachment0: entity.GetPrimaryPart().RootAttachment!,
        Parent: entity.GetPrimaryPart(),
    });
}

@QGSkill({
    id: "basket.rollingmovement"
})
export class RollingMovement extends Skill.Skill
{
    Name = "RollingMovement";
    GroundedType = Skill.SkillGroundedType.AirOk;
    LinksInto = Spin;

    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(startupFrames)
            .SetActive(0)
            .SetRecovery(0)
            .SetContact(0) 
            .SetBlockAdvantage(0)
            .SetCondition((entity) => !!yoyoState.getYoyo(entity))
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 0))
                    .SetSize(new Vector3(0, 0, 0))
                    .Construct(),
            )
            .SetEffectAtFrame(0, (entity, skill) =>
            {
                const gravityMover = makeGravityVelocity(entity, 1.05);
                gravityMover.Enabled = true,

                entity.GetPrimaryPart().AssemblyLinearVelocity = Vector3.zero;
                
                entity.attributes.ControlDelegated = true;
                entity.ControllerManager.ActiveController = entity.AirController;
            })
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("214K")
                    .SetAnimationId("rbxassetid://97999922106053")
                    .SetPriority(Enum.AnimationPriority.Action)
                    .Construct(),
            ).Construct();
}

export default RollingMovement;
