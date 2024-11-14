import { Dependency, OnPhysics, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import Make from "@rbxts/make";
import { Players, RunService, Workspace } from "@rbxts/services";
import { ICharacter } from "@quarrelgame-framework/types";

export enum YOYO_TYPE {
    PASSIVE,
    DEFENSIVE,
    OFFENSIVE,
}

interface YoyoObject extends MeshPart {
   TopYoyoAttachment: Attachment,
   BottomYoyoAttachment: Attachment,
   YoyoAttachment: Attachment,
}

interface YoyoAttributes {
    Type: YOYO_TYPE
    Velocity: number,
    Distance: number,

    Direction?: Vector3,
    Owner: string,

    /**
     * @description In seconds.
     **/
    Duration: number,
    CreationTime: number,
}

@Component({
    defaults: {
        Type: YOYO_TYPE.PASSIVE,
        Velocity: 48,
        Distance: 16,
        Duration: 5,

        CreationTime: -1,
    }
})
export default class YoyoComponent extends BaseComponent<YoyoAttributes, YoyoObject> implements OnStart, OnPhysics, OnTick
{
    public readonly characterOwner = Workspace.WaitForChild("CharacterContainer").GetChildren().find((e) => !!e.GetAttribute("EntityId")) as ICharacter;
    
    public readonly ownerPivotAtCreation = this.characterOwner.GetPivot();

    public velocityInstance = Make("AlignPosition", {
        Enabled: true,
        Attachment0: this.instance.YoyoAttachment,
        Mode: Enum.PositionAlignmentMode.OneAttachment,
        MaxAxesForce: new Vector3(this.attributes.Velocity, math.huge, this.attributes.Velocity),
        MaxVelocity: math.huge,
        ForceLimitMode: Enum.ForceLimitMode.PerAxis,
        ForceRelativeTo: Enum.ActuatorRelativeTo.World,
        Responsiveness: 100,
    });

    public angularVelocityInstance = Make("AngularVelocity", {
        Attachment0: this.instance.YoyoAttachment,
        RelativeTo: Enum.ActuatorRelativeTo.Attachment0,
        AngularVelocity: new Vector3(this.attributes.Velocity),
        MaxTorque: this.attributes.Velocity / 8,
    });

    public IsAtDestination()
    {
        return this.velocityInstance.Position.sub(this.instance.Position).Magnitude <= 0.1;
    }

    public Go(direction = this.attributes.Direction, distance = this.attributes.Distance)
    {
        this.instance.Anchored = false;
        this.velocityInstance.RigidityEnabled = false;

        this.velocityInstance.Position = this.characterOwner.GetPivot().Position.add((direction ?? this.characterOwner.GetPivot().LookVector).mul(distance));
        this.velocityInstance.MaxVelocity = this.attributes.Velocity
        this.velocityInstance.MaxAxesForce = new Vector3(this.attributes.Velocity * 16, this.attributes.Velocity * 16, this.attributes.Velocity * 16),
        this.velocityInstance.Enabled = true;
    }

    public Stop()
    {
        this.velocityInstance.RigidityEnabled = true;
        this.velocityInstance.Position = this.instance.Position;
    }

    onStart(): void 
    {
        // get character owner, error if it doesn't exist
        if (this.attributes.CreationTime === -1)

            this.attributes.CreationTime = DateTime.now().UnixTimestampMillis;

        this.instance.CanCollide = false;
        this.instance.CanQuery = false;

        assert(this.characterOwner, `character owner of entity ${this.attributes.Owner} not found.`);

        // set default position to the facing direction of the character
        // plus the width in that direction
        this.velocityInstance.Parent = this.instance;
        this.angularVelocityInstance.Parent = this.instance;
        print(`Yoyo Instance belonging to ${this.attributes.Owner} of type ${YOYO_TYPE[this.attributes.Type]} initialized.`) 

        const characterPivot = this.characterOwner.GetPivot();
        const { LookVector } = characterPivot;

        this.instance.PivotTo(characterPivot.add(LookVector.mul(2)))
        this.Stop();
        warn(`yoyo (${this.attributes.Owner}): going`);
        this.Go();
    }


    private lastPosition: Vector3 = Vector3.zero;
    onPhysics(dt: number, time: number): void 
    {
        if (this.velocityInstance.Enabled && !this.velocityInstance.RigidityEnabled)
        {
            if (this.IsAtDestination())
            {
                this.angularVelocityInstance.AngularVelocity = Vector3.zero;
                return;
            }

            const positionDelta = this.lastPosition.sub(this.instance.Position).Unit.Dot(this.attributes.Direction ?? (this.velocityInstance.Position.sub(this.instance.Position).Unit))
            this.angularVelocityInstance.AngularVelocity = new Vector3(this.attributes.Velocity * 0.125 * math.sign(positionDelta));
        }

        this.lastPosition = this.instance.Position;
    }

    private destinationTicks: number = 0;
    private isDestroying: boolean = false;
    onTick(dt: number)
    {
        if (this.IsAtDestination())

            this.destinationTicks += dt

        else

            this.destinationTicks = 0;
        
        if (this.destinationTicks >= this.attributes.Duration)
        {
            warn(`yoyo (${this.attributes.Owner}): destroying`);
            Dependency<Components>().removeComponent<YoyoComponent>(this.instance);

            let tickLoop: RBXScriptConnection | void;
            return new Promise((res) =>
            {
                res(Promise.race<number>([
                    Promise.delay(this.attributes.Duration / 2), 
                    new Promise((res) => 
                                tickLoop = 
                                    RunService.Heartbeat.Connect(() => 
                                    {
                                        this.velocityInstance.Position = this.characterOwner.GetPivot().Position;
                                        this.velocityInstance.MaxVelocity = this.attributes.Velocity * 2.25;
                                        if (this.IsAtDestination())

                                            res(0) 
                                    }))
                ]).then(() => tickLoop = tickLoop?.Disconnect()).finally(() => this.instance.Destroy()))
            });
        }
    }
}
