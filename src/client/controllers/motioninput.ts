import { MotionInputHandling, NewMotionInputController } from "@rbxts/quarrelgame-framework";
import { Controller, OnRender, OnStart } from "@flamework/core";
import { CharacterController } from "./character";
import { OnKeyboardInput } from "@rbxts/quarrelgame-framework/out/client/controllers/keyboard.controller";

@Controller({})
export class MotionInputController extends NewMotionInputController<CharacterController> implements OnStart, OnRender, OnKeyboardInput {
    constructor(protected characterController: CharacterController)
    { super(characterController); }

    onStart(): void {
        super.onStart();
        print("motion input controller operational");
    }
}

