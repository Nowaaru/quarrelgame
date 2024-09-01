import { Controller, OnRender, OnStart } from "@flamework/core";
import { CombatController2D, KeyboardEvents, MatchController, MotionInputHandling, OnArenaChange, OnKeyboardInput, OnMatchRespawn, OnRespawn } from "@quarrelgame-framework/client";
import { Input, MotionInput } from "@quarrelgame-framework/common"
import { QGCharacterController } from "./character";
import { Input  as InputController } from "@quarrelgame-framework/client";

import { PlatformCameraController2D } from "client/controllers/platformcamera2d";
import { Client } from "./client";

@Controller({})
export class Combat extends CombatController2D implements OnStart, OnRender, KeyboardEvents, MotionInputHandling, OnMatchRespawn 
{
    constructor(protected readonly client: Client, protected readonly characterController: QGCharacterController, protected readonly matchController: MatchController, protected readonly inputController: InputController) {
        super(client, characterController, matchController, inputController);

        this.keybindMap = new Map<Enum.KeyCode, Input>([
            [Enum.KeyCode.Zero, Input.Roman],
            [Enum.KeyCode.Backspace, Input.Burst],
            [Enum.KeyCode.LeftBracket, Input.Slash],
            [Enum.KeyCode.Semicolon, Input.Punch],
            [Enum.KeyCode.BackSlash, Input.Kick],
            [Enum.KeyCode.RightBracket, Input.Heavy],
            [Enum.KeyCode.Quote, Input.Dust],
            [Enum.KeyCode.RightShift, Input.Sweep],
            [Enum.KeyCode.LeftShift, Input.Dash]
        ]);
    }

    onRespawn(character: Model): void {
        super.onMatchRespawn(character);
        print("on respawn!!");
    }
}
