import { Controller, Dependency, OnInit } from "@flamework/core";
import { Players, StarterGui } from "@rbxts/services";

import { Client as QGFClient, CharacterSelectController } from "@quarrelgame-framework/client";
import { CommandController } from "./command";
import Characters from "data/character";

print("ruh roh raggy");
export class Client extends QGFClient implements OnInit
{
    constructor(protected characterSelectController: CharacterSelectController, protected commandController: CommandController)
    { super(); }

    onInit(): void {
        print("i'm gonna blow up and act like i don't know nbobody!!")

        Players.LocalPlayer.CameraMinZoomDistance = 8;
        Players.LocalPlayer.CameraMaxZoomDistance = Players.LocalPlayer.CameraMinZoomDistance;

        StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);
        this.commandController.SetKeys(Enum.KeyCode.Backquote, Enum.KeyCode.F2);
    }

    onStart()
    {
        print("Example Client loaded.");
        this.characterSelectController.SetCharacters(Characters);
    }
}
