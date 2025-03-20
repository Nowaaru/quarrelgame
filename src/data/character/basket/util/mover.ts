
import { Entity } from "@quarrelgame-framework/common";
import { Workspace } from "@rbxts/services";
import Make from "@rbxts/make";

export const getGravityVelocityForce = (entity: Entity, gravityPercentage = 1) =>
    new Vector3(0, Workspace.Gravity * entity.GetPrimaryPart().AssemblyMass * gravityPercentage, 0);

export const makeGravityVelocity = (entity: Entity, gravityPercentage = 0.9) => 
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
