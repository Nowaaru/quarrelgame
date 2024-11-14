import { Dependency, OnPhysics, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import Make from "@rbxts/make";
import { Players, RunService, Workspace } from "@rbxts/services";
import { ICharacter } from "@quarrelgame-framework/types";

interface MoverAttributes {
    Direction?: Vector3,
    Distance: number,
    Velocity: number,

    RotationEnabled: boolean,
    RotationVelocity?: number,
    RotationDirection?: Vector3,
}

export const defaultMoverAttributes = {
    Velocity: 48,
    Distance: 16,
    RotationEnabled: false,
}

@Component({
    defaults: defaultMoverAttributes
})
export default class AttachmentMoverComponent extends BaseComponent<MoverAttributes, Attachment> implements OnStart, OnPhysics
{
    public velocityInstance = Make("AlignPosition", {
        Enabled: true,
        Attachment0: this.instance,
        Mode: Enum.PositionAlignmentMode.OneAttachment,
        MaxAxesForce: new Vector3(this.attributes.Velocity, math.huge, this.attributes.Velocity),
        MaxVelocity: math.huge,
        ForceLimitMode: Enum.ForceLimitMode.PerAxis,
        ForceRelativeTo: Enum.ActuatorRelativeTo.World,
        Responsiveness: 100,
    });

    public angularVelocityInstance = Make("AngularVelocity", {
        Attachment0: this.instance,
        RelativeTo: Enum.ActuatorRelativeTo.Attachment0,
        AngularVelocity: (this.attributes.RotationDirection ?? new Vector3(1)).mul(this.attributes.RotationVelocity ?? this.attributes.Velocity),
        MaxTorque: this.attributes.RotationVelocity ?? (this.attributes.Velocity / 8),
    });

    public IsAtDestination()
    {
        return this.velocityInstance.Position.sub(this.instance.WorldPosition).Magnitude <= 0.1;
    }

    public Go(position: Vector3)
    {
        this.velocityInstance.RigidityEnabled = false;
        this.velocityInstance.Position = position;
        this.velocityInstance.MaxVelocity = this.attributes.Velocity
        this.velocityInstance.MaxAxesForce = new Vector3(this.attributes.Velocity * 16, this.attributes.Velocity * 16, this.attributes.Velocity * 16),
        this.velocityInstance.Enabled = true;
    }

    public Stop()
    {
        this.velocityInstance.RigidityEnabled = true;
        this.velocityInstance.Position = this.instance.WorldPosition;
    }

    onStart(): void 
    {
        this.velocityInstance.Parent = this.instance;
        this.angularVelocityInstance.Parent = this.instance;

        this.Stop();
    }


    private lastPosition: Vector3 = Vector3.zero;
    onPhysics(): void 
    {
        if (this.velocityInstance.Enabled && !this.velocityInstance.RigidityEnabled)
        {
            if (this.IsAtDestination())
            {
                this.angularVelocityInstance.AngularVelocity = Vector3.zero;
                return;
            }

            const positionDelta = this.lastPosition.sub(this.instance.WorldPosition).Unit.Dot(this.attributes.Direction ?? (this.velocityInstance.Position.sub(this.instance.WorldPosition).Unit))
            this.angularVelocityInstance.AngularVelocity = new Vector3(this.attributes.Velocity * 0.125 * math.sign(positionDelta));
        }

        this.lastPosition = this.instance.WorldPosition;
    }

}
