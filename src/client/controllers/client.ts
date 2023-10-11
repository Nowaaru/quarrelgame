import { Controller, Dependency, OnInit } from "@flamework/core";
import { CommandController } from "@rbxts/quarrelgame-framework";
import { Players, StarterGui } from "@rbxts/services";

import * as QuarrelGameFramework from "@rbxts/quarrelgame-framework"

@Controller({})
export class Client extends QuarrelGameFramework.Client implements OnInit
{
    private commandController!: CommandController;

    onInit(): void {
        this.commandController = Dependency<CommandController>();

        Players.LocalPlayer.CameraMinZoomDistance = 8;
        Players.LocalPlayer.CameraMaxZoomDistance = Players.LocalPlayer.CameraMinZoomDistance;

        StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);
        this.commandController.SetKeys(Enum.KeyCode.Backquote, Enum.KeyCode.F2);
    }

    onStart()
    {
        print("Example Client loaded.");
    }
}
