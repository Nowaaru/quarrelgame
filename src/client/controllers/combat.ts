import { Controller, Dependency, OnInit, OnRender, } from "@flamework/core";
import { CombatController2D, Input, MotionInput, OnArenaChange, OnRespawn } from "@rbxts/quarrelgame-framework";
import { OnKeyboardInput } from "@rbxts/quarrelgame-framework/out/client/controllers/keyboard.controller";
import { PlatformCameraController2D } from "./platformcamera2d";

@Controller({})
export class Combat extends CombatController2D implements OnRespawn, OnInit, OnKeyboardInput
{
    constructor()
    {
        super(Dependency<MotionInput.MotionInputController>(), Dependency<PlatformCameraController2D>());

        this.keybindMap = new Map<Enum.KeyCode, Input>([
            [Enum.KeyCode.F, Input.Slash],
            [Enum.KeyCode.V, Input.Heavy],
            [Enum.KeyCode.G, Input.Kick]
        ])
    }

    onRespawn(character: Model): void {
        super.onMatchRespawn(character)
        print("on respawn!!");
    }
}
