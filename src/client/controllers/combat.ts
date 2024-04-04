import { Controller, Dependency, OnInit, OnRender } from "@flamework/core";
import { CombatController2D, Input, MotionInput, OnArenaChange, OnRespawn } from "@rbxts/quarrelgame-framework";
import { OnKeyboardInput } from "@rbxts/quarrelgame-framework/out/client/controllers/keyboard.controller";
import { PlatformCameraController2D } from "client/controllers/platformcamera2d";

@Controller({})
export class Combat extends CombatController2D implements OnRespawn, OnInit, OnKeyboardInput {
    constructor() {
        super(Dependency<MotionInput.MotionInputController>(), Dependency<PlatformCameraController2D>());

        this.keybindMap = new Map<Enum.KeyCode, Input>([
            [Enum.KeyCode.Seven, Input.Roman],
            [Enum.KeyCode.Nine, Input.Burst],
            [Enum.KeyCode.U, Input.Slash],
            [Enum.KeyCode.I, Input.Punch],
            [Enum.KeyCode.O, Input.Kick],
            [Enum.KeyCode.J, Input.Heavy],
            [Enum.KeyCode.K, Input.Dust],
            [Enum.KeyCode.L, Input.Sweep],
        ]);
    }

    onInit(): void | Promise<void> {
    }

    onRespawn(character: Model): void {
        super.onMatchRespawn(character);
        print("on respawn!!");
    }
}
