import { Controller, OnStart, OnTick } from "@flamework/core";
import { HumanoidController, OnRespawn } from "@rbxts/quarrelgame-framework";

interface LoadedHumanoidController {

    GetHumanoidController(): NonNullable<ReturnType<HumanoidController["GetHumanoidController"]>>;
    GetSensors(): NonNullable<ReturnType<HumanoidController["GetSensors"]>>;
}

@Controller({})
export class Humanoid2D extends HumanoidController implements OnStart, OnRespawn, OnTick
{
    public IsControllerActive(controller: ControllerBase)
    {
        return this.assertController() && this.GetHumanoidController()!.ActiveController === controller;
    }

    public Rotate(towards: Vector3)
    {

        if (!this.assertController())

            return;

        this.GetHumanoidController()!.FacingDirection = towards;
    }

    private UpdateMoveDirection()
    {
        if (!this.assertController())

            return;

        const controller = this.GetHumanoidController()!;
        const currentHumanoid = this.character!.Humanoid;

        const { MoveDirection } = currentHumanoid;
        controller.MovingDirection = MoveDirection;
        if (this.autoRotate && MoveDirection.Magnitude > 0)
            
            this.Rotate(MoveDirection);

    }

    public canEnterSwimming()
    {
        return this.assertCharacter() && this.GetSensors()!.SwimSensor.TouchingSurface && this.character!.Humanoid.GetState() !== Enum.HumanoidStateType.Swimming;
    }

    public canEnterFalling()
    {
        if (!this.assertController() || !this.assertCharacter())

            return;

        const controller = this.GetHumanoidController()!;
        const sensors = this.GetSensors()!;

        return (
            !sensors.GroundSensor.SensedPart === undefined 
            && !sensors.ClimbSensor.SensedPart
            && !(
                    this.IsControllerActive(controller.AirController) 
                    || sensors.SwimSensor.TouchingSurface
                )
        )
            || this.character!.Humanoid.GetState() === Enum.HumanoidStateType.Jumping;
    }

    public canEnterStanding()
    {
        if (!this.assertController() || !this.assertCharacter())
        
            return;

        const controller = this.GetHumanoidController()!;
        print(this.GetSensors()!.GroundSensor.SearchDistance);

        return this.GetSensors()!.GroundSensor.SensedPart 
            && this.character!.Humanoid.GetState() !== Enum.HumanoidStateType.Jumping
            && !this.IsControllerActive(controller.GroundController);
    }

    public canEnterClimbing()
    {
        if (!this.assertController())

            return;

        const controller = this.GetHumanoidController()!;

        return this.GetSensors()!.ClimbSensor.SensedPart && !this.IsControllerActive(controller.ClimbController);
    }
    
    private UpdateState()
    {
        if (!this.assertController() || !this.assertCharacter())

            return;

        const controller = this.GetHumanoidController()!;
        const humanoid = this.character!.Humanoid;

        const { HumanoidStateType } = Enum;
        if (this.canEnterSwimming())
        {
            humanoid.ChangeState(HumanoidStateType.Swimming);
            controller.ActiveController = controller.SwimController;
        }   
        else if (this.canEnterClimbing())
        {
            humanoid.ChangeState(HumanoidStateType.Climbing);
            controller.ActiveController = controller.ClimbController;
        }
        else if (this.canEnterStanding())
        {
            humanoid.ChangeState(HumanoidStateType.Running);
            controller.ActiveController = controller.GroundController;
        }
        else if (this.canEnterFalling())
        { 
            humanoid.ChangeState(HumanoidStateType.Freefall);
            controller.ActiveController = controller.AirController 
        };

        if (controller.ActiveController !== controller.GroundController)
            print("controller not ground - active controller:", controller.ActiveController);
    }

    private assertCharacter(errorOut?: boolean)
    {
        if (!errorOut && !this.character)

            return false;

        assert(this.character, "character does not exist");
        return true;
    }

    private assertController(errorOut?: boolean)
    {
        if (!errorOut && !this.GetHumanoidController())

            return false;

        assert(this.GetHumanoidController(), "humanoid controller does not exist");
        return true;
    }

    onRespawn(character: Model) {
        const [ controllers, sensors ] = super.onRespawn(character);
        const humanoid = (character as typeof this.character).Humanoid;

        const { GroundController } = this.GetHumanoidController()!;
        GroundController.GroundOffset = humanoid.HipHeight;
        GroundController.BalanceRigidityEnabled = true;
        GroundController.Friction = 1;
        GroundController.FrictionWeight = 2;
        GroundController.AccelerationTime = 0.15;
        GroundController.DecelerationTime = 0.2;
        GroundController.TurnSpeedFactor = 2;
        

        const { GroundSensor, ClimbSensor } = this.GetSensors()!;
        GroundSensor.SearchDistance = GroundController.GroundOffset + 0.25;
        GroundSensor.SensorMode = Enum.SensorMode.Floor;

        ClimbSensor.SensorMode = Enum.SensorMode.Ladder;
        ClimbSensor.SearchDistance = 1.25;

        return $tuple(controllers, sensors);
    }

    onStart(): void 
    {
        super.onStart();
    }

    onTick()
    {
        this.UpdateState();
        this.UpdateMoveDirection();
    }

    protected autoRotate = false;

    declare protected character: (Model & { Humanoid: globalThis.Humanoid; });
}
