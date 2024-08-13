import { Controller, Dependency, OnInit, OnRender } from "@flamework/core";
import { CombatController2D, MatchController, OnArenaChange, OnRespawn } from "@quarrelgame-framework/client";
import { Input, MotionInput } from "@quarrelgame-framework/common"
import { PlatformCameraController2D } from "client/controllers/platformcamera2d";
import { QGCharacterController } from "./character";

@Controller({})
export class Combat extends CombatController2D<QGCharacterController> implements OnRespawn, OnInit {
    constructor(protected readonly characterController: QGCharacterController, protected readonly matchController: MatchController) {
        super(characterController, matchController);

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

    onInit(): void | Promise<void> {
    }

    onRespawn(character: Model): void {
        super.onMatchRespawn(character);
        print("on respawn!!");
    }
}
