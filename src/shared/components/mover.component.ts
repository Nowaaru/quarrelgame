import { Dependency, OnPhysics, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import Make from "@rbxts/make";
import { Players, RunService, Workspace } from "@rbxts/services";
import { ICharacter } from "@quarrelgame-framework/types";

interface MoverAttributes {
    Velocity: number,

    RotationEnabled: boolean,
    RotationVelocity?: number,
    RotationDirection?: Vector3,
}

export const defaultMoverAttributes = {
    Velocity: 48,
    RotationEnabled: false,
}

@Component({
    defaults: defaultMoverAttributes
})
export default class AttachmentMoverComponent extends BaseComponent<MoverAttributes, Attachment> implements OnStart
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

    public IsAtDestination(radius = 0.1)
    {
        return this.velocityInstance.Position.sub(this.instance.WorldPosition).Magnitude <= radius;
    }

    public Go(position: Vector3)
    {
        this.velocityInstance.MaxVelocity = this.attributes.Velocity;
        this.velocityInstance.MaxForce = this.attributes.Velocity;

        this.velocityInstance.RigidityEnabled = false;
        this.velocityInstance.Position = position;
        this.velocityInstance.Enabled = true;

        this.ResetInstance();
    }

    public ResetInstance()
    {
        this.velocityInstance.MaxVelocity = this.attributes.Velocity
        this.velocityInstance.ForceLimitMode = Enum.ForceLimitMode.PerAxis;
        this.velocityInstance.MaxAxesForce = new Vector3(...table.create(3, this.attributes.Velocity));
    }

    public Stop()
    {
        this.velocityInstance.RigidityEnabled = true;
        this.velocityInstance.Position = this.instance.WorldPosition;
    }

    public Cleanup(destroyInstance = true)
    {
        Dependency<Components>().removeComponent<AttachmentMoverComponent>(this.instance);
        if (destroyInstance)

            this.instance.Destroy();

        else
        {
            this.velocityInstance = this.velocityInstance.Destroy() as never;
            this.angularVelocityInstance = this.angularVelocityInstance.Destroy() as never;
            
            // setmetatable(this, { 
            //     __index: () =>
            //     {
            //         throw "This mover has already been cleaned up. Please remove this referenced."
            //     },
            // });
        }
    }

    onStart(): void 
    {
        this.velocityInstance.Parent = this.instance;
        this.angularVelocityInstance.Parent = this.instance;

        this.Stop();
    }
}
