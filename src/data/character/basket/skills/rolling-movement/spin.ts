
import { QGSkill, Animation, Skill, Hitbox, Entity, SkillManager } from "@quarrelgame-framework/common";
import { Dependency } from "@flamework/core";
import { Components } from "@flamework/components";
import { RunService } from "@rbxts/services";
import AttachmentMoverComponent from "shared/components/mover.component";

import yoyoState from "../../util/yoyo-state";
import { makeGravityVelocity, getGravityVelocityForce } from "../../util/mover";

const spinMovementStartupFrames = 8;
const maxSpinDurationFrames = math.huge;

const getMover = (entity: Entity) => 
{
    const components = Dependency<Components>(), root = entity.GetPrimaryPart().RootAttachment;
    assert(root, `root attachment for entity ${entity.attributes.EntityId} not found.`);
    return components.getComponent<AttachmentMoverComponent>(root) ?? components.addComponent<AttachmentMoverComponent>(root);
}

@QGSkill({
    id: "basket.spin"
})
export class Spin extends Skill.Skill
{
    Name = "Rolling Movement - Spin"
    GroundedType = Skill.SkillGroundedType.AirOk
    FrameData = 
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
            entity.GetPrimaryPart().FindFirstChild("VectorForce")?.Destroy(); // TODO: tidy up
            if (!yoyoState.canRegisterYoyo(entity))
            {
                entity.Humanoid.ChangeState(Enum.HumanoidStateType.Freefall);
                const existingYoyo = yoyoState.getYoyo(entity)!;
                const yoyoLocation = CFrame.lookAlong(existingYoyo.Position, entity.instance.GetPivot().LookVector);
                const entityMover = getMover(entity);
                const castPosition = entity.GetPrimaryPart().Position;

                const lowGravityPercentage = 0.9;
                const velocityMax = 3000;

                const velocityResponsiveness = 32;
                const velocity = entityMover.velocityInstance;
                entityMover.attributes.Velocity = 128;
                velocity.MaxVelocity = velocityMax
                entityMover.Go(yoyoLocation.Position);
                
                // TODO: remove this once we have spin state
                let metDestination = false;
                const velocityMover = makeGravityVelocity(entity); 
                const searchDistance = entity.GroundSensor.SearchDistance;
                entity.GroundSensor.SearchDistance /= 1.5;
                velocityMover.Enabled = true;
                let distancePercentage = 0;
                let _conn = RunService.Heartbeat.Connect(() =>
                {
                    const controllerMovingDirection = entity.ControllerManager.MovingDirection;
                    const upDot = controllerMovingDirection.Dot(new Vector3(0,1,0));
                    const distanceToTargetNow = yoyoLocation.Position.sub(entity.GetPrimaryPart().Position);
                    const castDistanceToTarget = yoyoLocation.Position.sub(castPosition);
                    const castDistanceToNow = entity.GetPrimaryPart().Position.sub(castPosition);
                    const velocityCalculation = entity.GetPrimaryPart().AssemblyMass * entityMover.attributes.Velocity;
                    const entityHalfHeight = entity.instance.GetBoundingBox()[1].Y * 0.5;
                    distancePercentage = math.clamp(castDistanceToNow.Magnitude / castDistanceToTarget.Magnitude, distancePercentage, 1);

                    if (!metDestination && (!yoyoState.getYoyo(entity) || entityMover.IsAtDestination(entityHalfHeight * 0.75)))
                    {                           
                        metDestination = true;
                        entityMover.Cleanup(false);

                        // once the yoyo mover is completed,
                        // automatically set the entity's
                        // velocity to a quarter of its magnitude
                        const primary = entity.GetPrimaryPart()
                        velocityMover.Force = getGravityVelocityForce(entity, lowGravityPercentage); // low gravity after dropping from spin
                        primary.AssemblyLinearVelocity = primary.AssemblyLinearVelocity.Unit.mul(primary.AssemblyLinearVelocity.Magnitude / 2);
                    }

                    // when spinning, you have to be lower to the floor 
                    // than usual in order to land 
                    if (entity.SenseGround() && metDestination)
                    {
                        print("met destination easy");
                        entity.GroundSensor.SearchDistance = searchDistance;
                        entity.attributes.ControlDelegated = false;
                        velocityMover.Destroy();
                        _conn = _conn.Disconnect() as never;

                        const previousSkill = entity.attributes.PreviousSkill;
                        const cachedPreviousSkill = Dependency<SkillManager>().GetSkill(previousSkill ?? tostring({}));
                        cachedPreviousSkill?.FrameData.Cancel(entity, skill);
                        print(cachedPreviousSkill?.FrameData);

                        // call physics handler
                        // (its what makes the entity do physics things)
                        entity.onPhysics();
                    }

                    if (!metDestination)
                    {
                        const isPressingVertical = (math.abs(upDot) - 0.15) > 0.25;
                        // if ((upDot - (math.sign(upDot) * 0.15)) > 0.25)
                        if (isPressingVertical)
                        {
                            const isUp = math.sign(upDot) > 0;
                            // use toObjectSpace just in case the entity is upside down
                            // with the root part as the world origin, Y < 0 means the character is above the yoyo
                            const yDistance = entity.GetPrimaryPart().CFrame.ToObjectSpace(yoyoLocation).Y;
                            const isAboveYoyo = yDistance < 0.125; // just in-case they're in relatively the same elevation
                            const upCalc = (entityHalfHeight * 2) * (1 + math.max(0, distancePercentage));
                            const downCalc = distancePercentage;
                            if (isUp)
                                velocity.Position = yoyoLocation.Position.add(
                                    CFrame.lookAlong(entity.GetPrimaryPart().Position, distanceToTargetNow.Unit, entity.GetPrimaryPart().GetPivot().UpVector).UpVector.mul(2 * entityHalfHeight * (1.25 - distancePercentage))
                                );
                            else velocity.Position = yoyoLocation.Position.sub(new Vector3(0, entityHalfHeight * (distancePercentage)));

                            
                            print("is above yoyo:", isAboveYoyo)
                            const calc = isAboveYoyo ? (isUp ? downCalc : upCalc) : (isUp ? upCalc : downCalc);
                            velocity.ForceLimitMode = Enum.ForceLimitMode.PerAxis;
                            velocity.MaxAxesForce = new Vector3(...table.create(3, velocityCalculation)).mul(new Vector3(1,calc,1));
                            velocity.MaxForce = velocityCalculation * calc;
                            velocity.Responsiveness = velocityResponsiveness * (distancePercentage + 0.35);
                        } 
                        else                                 
                        {
                            print("normal");
                            velocity.ForceLimitMode = Enum.ForceLimitMode.Magnitude;
                            velocity.Position = yoyoLocation.Position;
                            velocity.MaxForce = velocityCalculation;

                            // velocity.MaxAxesForce = new Vector3(...table.create(3, velocityCalculation / entityMover.attributes.Distance));
                            velocity.Responsiveness = velocityResponsiveness * 2;
                        }

                        const dotDirection = controllerMovingDirection.mul(new Vector3(1,0,1)).Unit.Dot((distanceToTargetNow.mul(new Vector3(1,0,1)).Unit));
                        if (math.abs(dotDirection) > 0.5) 
                        {
                            velocity.MaxAxesForce = velocity.MaxAxesForce.mul((dotDirection > 0 ? 1 : 0) * 0.65)
                            velocity.MaxForce = dotDirection < 0 ? velocityCalculation : velocityCalculation * 1.5;
                        };

                        velocityMover.Force = getGravityVelocityForce(entity,lowGravityPercentage);
                    }

                    // const pv = <T=unknown>(a: T, x: string = "") => {print(x+tostring(a)); return a};
                    // velocity.Responsiveness = math.max(velocity.Responsiveness, velocityResponsiveness + (targetVelocityResponsiveness - velocityResponsiveness) * unclampedDistancePercentage /* (a + (b - a) * t) lerp */);
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
     .Construct()
};

export default Spin;
