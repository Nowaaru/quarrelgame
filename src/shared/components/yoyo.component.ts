import { Dependency, OnPhysics, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import Make from "@rbxts/make";
import { Players, RunService, Workspace } from "@rbxts/services";
import { ICharacter } from "@quarrelgame-framework/types";
import MoverComponent from "./mover.component";

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
    Distance: number,

    Velocity: number,
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

    protected mover!: MoverComponent;

    public Go(direction = this.attributes.Direction, distance = this.attributes.Distance)
    {
        this.mover.Go(this.instance.Position.add(direction ?? this.characterOwner.GetPivot().LookVector.mul(distance)));
    }

    public Stop()
    {
        this.mover.Stop();
    }

    onStart(): void 
    {
        const mover = this.mover = Dependency<Components>().addComponent<MoverComponent>(this.instance.YoyoAttachment);

        // get character owner, error if it doesn't exist
        if (this.attributes.CreationTime === -1)

            this.attributes.CreationTime = DateTime.now().UnixTimestampMillis;

        this.instance.CanCollide = false;
        this.instance.CanQuery = false;

        assert(this.characterOwner, `character owner of entity ${this.attributes.Owner} not found.`);

        // set default position to the facing direction of the character
        // plus the width in that direction
        print(`Velocity Instance belonging to ${this.attributes.Owner} of type ${YOYO_TYPE[this.attributes.Type]} initialized.`) 

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
        if (this.mover.velocityInstance.Enabled && !this.mover.velocityInstance.RigidityEnabled)
        {
            if (this.mover.IsAtDestination())
            {
                this.mover.angularVelocityInstance.AngularVelocity = Vector3.zero;
                return;
            }

            const positionDelta = this.lastPosition.sub(this.instance.Position).Unit.Dot(this.attributes.Direction ?? (this.mover.velocityInstance.Position.sub(this.instance.Position).Unit))
            this.mover.angularVelocityInstance.AngularVelocity = new Vector3(this.attributes.Velocity * 0.125 * math.sign(positionDelta));
        }

        this.lastPosition = this.instance.Position;
    }

    private destinationTicks: number = 0;
    onTick(dt: number)
    {
        if (this.mover.IsAtDestination())
        
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
                                        this.mover.velocityInstance.Position = this.characterOwner.GetPivot().Position;
                                        this.mover.velocityInstance.MaxVelocity = this.attributes.Velocity * 2.25;
                                        if (this.mover.IsAtDestination())

                                            res(0) 
                                    }))
                ]).then(() => tickLoop = tickLoop?.Disconnect()).finally(() => this.instance.Destroy()))
            });
        }
    }
}
