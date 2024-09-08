import { Controller, OnRender } from "@flamework/core";
import Make from "@rbxts/make";
import Roact from "@rbxts/roact";
import InputDisplay from "client/ui/inputdisplay";

import { Combat } from "./combat";
import { QGCharacterController } from "./character";

import { KeyboardEvents, MotionInputHandling, OnMatchRespawn, OnRespawn, Input as InputHandler} from "@quarrelgame-framework/client";
import { ConvertMoveDirectionToMotion, Input, Motion, MotionInput } from "@quarrelgame-framework/common";
import { Managed, ICharacter } from "@quarrelgame-framework/types";
import { Client } from "./client";

@Controller({})
export class TrainingController implements /* KeyboardEvents, */ OnMatchRespawn, MotionInputHandling
{
    public readonly TrainingGui: ScreenGui = 
            Make("ScreenGui", { 
                Name: "TrainingController.TrainingGui", 
                ScreenInsets: Enum.ScreenInsets.DeviceSafeInsets
            });


    constructor(protected CharacterController: QGCharacterController, protected CombatController: Combat, protected Client: Client, protected Input: InputHandler)
    {}

    private motionDisplayElement?: Roact.Element;
    private motionDisplayInstance?: Roact.Tree;
    public RenderMotionDisplay(forceShow: boolean = true)
    {
        this.motionDisplayElement = Roact.createElement(InputDisplay, {
            Motion: this.lastMotion as Motion,
            Input: this.lastInput as Input,
            Position: UDim2.fromScale(0.5, 0.5)
        })

        if (forceShow)

            this.ShowMotionDisplay()
    }

    public ShowMotionDisplay()
    {
        if (this.motionDisplayElement)

            this.motionDisplayInstance = Roact.mount(
                this.motionDisplayElement,
                this.TrainingGui,
                "CharacterSelect",
            );
    }

    public HideMotionDisplay()
    {
        if (this.motionDisplayInstance)

            Roact.unmount(this.motionDisplayInstance)

        this.motionDisplayInstance = undefined;
    }

    private lastInput?: string;
    private lastMotion?: number;
    // onKeyPressed(inputObject: InputObject): void 
    // {
    //     const characterInputs = this.CharacterController.GetKeybinds();
    //     const combatInputs = this.CombatController.GetKeybinds();
    //
    //     if (characterInputs.has(inputObject.KeyCode))
    //
    //         this.lastMotion = Motion[ConvertMoveDirectionToMotion(Vector3.FromNormalId(characterInputs.get(inputObject.KeyCode)!))[0]]
    //
    //     else if (combatInputs.has(inputObject.KeyCode))
    //
    //         this.lastInput = combatInputs.get(inputObject.KeyCode)! as Input;
    //
    //     this.RenderMotionDisplay()
    // }

    // onKeyReleased(inputObject: InputObject): void 
    // {
    //     const characterInputs = this.CharacterController.GetKeybinds();
    //     const combatInputs = this.CombatController.GetKeybinds();
    //
    //     for (const [keycode, input] of combatInputs)
    //
    //         if (!this.Input.IsKeyDown(keycode) && this.lastInput && input === Input[this.lastInput as keyof typeof Input])
    //
    //             this.lastInput = undefined;
    //             
    //
    //     this.RenderMotionDisplay()
    // }

    onMotionInputChanged(motionInput: MotionInput): void
    {   
        const lastInput = motionInput[motionInput.size() - 1];
        if (lastInput)
        {
            const inputAsMotion: number | undefined = Motion[Motion[lastInput as never] as keyof typeof Motion] as number | undefined;
            const inputAsInput: string | undefined = Input[lastInput as never];
            
            if (inputAsMotion)
            {
                const moveDirection = this.CharacterController.GetMoveDirection();
                const adaptedMoveDirection = new Vector3(-(moveDirection.X + (math.abs(moveDirection.Z) > 0 ? moveDirection.Z : moveDirection.X)) / 2, moveDirection.Y)

                const motion = Motion[ConvertMoveDirectionToMotion(adaptedMoveDirection)[0]];
                this.lastMotion = motion;
            } else this.lastInput = Input[inputAsInput];

            this.RenderMotionDisplay()
        }
        
    }

    onMatchRespawn(character: Managed<ICharacter>, player?: Player | undefined): void 
    {
        this.TrainingGui.Parent = this.Client.player.PlayerGui;
        this.RenderMotionDisplay()
    }

}
