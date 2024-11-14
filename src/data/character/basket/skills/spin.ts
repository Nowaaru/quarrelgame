import { Animation, Skill, Hitbox, Motion, Input, QuarrelAssets, Character, Entity, EntityState, SkillManager } from "@quarrelgame-framework/common";
import yoyoState from "../util/yoyo-state";
import YoyoComponent, { YOYO_TYPE } from "shared/components/yoyo.component";
import { Dependency } from "@flamework/core";
import { Components } from "@flamework/components";
import { RunService, Workspace } from "@rbxts/services";
import AttachmentMoverComponent from "shared/components/mover.component";
import Make from "@rbxts/make";

const startupFrames = 13;
const spinMovementStartupFrames = 8;
const maxSpinDurationFrames = 64;

const getMover = (entity: Entity) => 
{
    const components = Dependency<Components>(), root = entity.GetPrimaryPart().RootAttachment;
    assert(root, `root attachment for entity ${entity.attributes.EntityId} not found.`);
    return components.getComponent<AttachmentMoverComponent>(root) ?? components.addComponent<AttachmentMoverComponent>(root);
}

export const RollingMovement = new Skill.SkillBuilder()
    .SetName("Rolling Movement")
    .SetGroundedType(Skill.SkillGroundedType.AirOk)
    .SetLink(new Skill.SkillBuilder()
             .SetName("Rolling Movement - Spin")
             .SetGroundedType(Skill.SkillGroundedType.AirOk)
             .SetFrameData(
                 new Skill.FrameDataBuilder()
                 .SetStartup(spinMovementStartupFrames) // cant attack instantly out of spin
                 .SetActive(maxSpinDurationFrames) // TODO: make this math.huge once i can confirm that it wont break the framework
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
                .SetEffectAtFrame(0, (entity, skill) =>
                {
                    getMover(entity).Stop()
                    entity.attributes.ControlDelegated = true;
                    entity.ControllerManager.ActiveController = entity.AirController;
                })
                .SetEffectAtFrame(spinMovementStartupFrames, (entity, skill) =>
                {
                    if (!yoyoState.canRegisterYoyo(entity))
                    {
                        entity.Humanoid.ChangeState(Enum.HumanoidStateType.Freefall);
                        
                        const existingYoyo = yoyoState.getYoyo(entity)!;
                        const yoyoLocation = CFrame.lookAlong(existingYoyo.Position, entity.instance.GetPivot().LookVector);
                        const entityMover = getMover(entity);

                        const velocity = entityMover.velocityInstance;
                        velocity.MaxVelocity = entity.GetPrimaryPart().AssemblyMass * 4;
                        velocity.ForceLimitMode = Enum.ForceLimitMode.Magnitude;
                        velocity.MaxForce = 3000;
                        velocity.Responsiveness = 65;

                        entityMover.Go(yoyoLocation.Position);

                        const velocityMover = Make("VectorForce", 
                        {
                            Enabled: false,
                            ApplyAtCenterOfMass: true,
                            Force: new Vector3(0, Workspace.Gravity * entity.GetPrimaryPart().AssemblyMass * 0.9, 0), // low gravity after dropping from spin
                            RelativeTo: Enum.ActuatorRelativeTo.World,
                            Attachment0: entityMover.instance,
                            Parent: entity.GetPrimaryPart(),
                        });

                        // TODO: remove this once we have spin state
                        const searchDistance = entity.GroundSensor.SearchDistance;
                        entity.GroundSensor.SearchDistance /= 2;

                        let _conn = RunService.Heartbeat.Connect(() =>
                        {
                            if (!velocityMover.Enabled && entityMover.IsAtDestination(existingYoyo.Size.Magnitude / 3))
                            {                           
                                velocityMover.Enabled = true;
                                entityMover.Cleanup(false);

                                // once the yoyo mover is completed,
                                // automatically set the entity's
                                // velocity to a quarter of its magnitude

                                const primary = entity.GetPrimaryPart()
                                primary.AssemblyLinearVelocity = primary.AssemblyLinearVelocity.Unit.mul(primary.AssemblyLinearVelocity.Magnitude / 2);
                            }
                            

                            // when spinning, you have to be lower to the floor 
                            // than usual in order to land 

                            if (entity.SenseGround()  && velocityMover.Enabled)
                            {
                                entity.GroundSensor.SearchDistance = searchDistance;
                                entity.attributes.ControlDelegated = false;
                                velocityMover.Destroy();
                                _conn = _conn.Disconnect() as never;


                                 
                                // at least make the entity look like they're idle
                                const previousSkill = entity.attributes.PreviousSkill;
                                const cachedPreviousSkill = Dependency<SkillManager>().GetSkill(previousSkill ?? tostring({}));
                                const animatorAnimation =  entity.Animator.LoadAnimation(cachedPreviousSkill!.FrameData.Animation!);

                                // TODO: skill cancel here
                                animatorAnimation.Stop({FadeTime: 0});

                                entity.onPhysics();
                            }
                        });
                    }
                })
                .SetEffectAtFrame(spinMovementStartupFrames + maxSpinDurationFrames - 2, (entity) =>
                {
                    // getMover(entity).Cleanup(false);
                    // entity.attributes.ControlDelegated = false;

                    // force onPhysics call
                    // in case entity state
                    // is not reset.


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
