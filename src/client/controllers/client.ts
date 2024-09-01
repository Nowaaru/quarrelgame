import { Controller, Dependency, OnInit, OnStart } from "@flamework/core";
import { Players, StarterGui } from "@rbxts/services";

import {
    Client as QGFClient,
    CharacterSelectController,
    OnCharacterSelected,
} from "@quarrelgame-framework/client";
import { CommandController } from "./command";
import Characters from "data/character";
import { Animator, Character } from "@quarrelgame-framework/common";
import { Functions, QuarrelFunctions } from "client/network";

@Controller({})
export class Client
    extends QGFClient
    implements OnStart, OnInit, OnCharacterSelected 
{
    constructor(
        protected characterSelectController: CharacterSelectController,
        protected commandController: CommandController,
    ) {
        super();
    }

    onInit(): void 
    {
        super.onInit();
        print("i'm gonna blow up and act like i don't know nbobody!!");

        Players.LocalPlayer.CameraMinZoomDistance = 8;
        Players.LocalPlayer.CameraMaxZoomDistance =
            Players.LocalPlayer.CameraMinZoomDistance;

        StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);
        this.commandController.SetKeys(Enum.KeyCode.Backquote, Enum.KeyCode.F2);

        Animator.RegisterCharacters(Characters);
    }

    onStart() 
    {
        print("Example Client loaded.");
        this.characterSelectController.SetCharacters(Characters);
    }

    onCharacterSelected(character: Character.Character): void 
    {
        QuarrelFunctions.SelectCharacter(character.Name).then(async () =>
            QuarrelFunctions.Ready().then(() =>
                QuarrelFunctions.MatchTest()
                    .then(() => {
                        print("oh my goodness gracious lol");
                        return;
                    })
                    .finally(() => this.characterSelectController.CloseCharacterSelect()),
            ),
        );
    }
}
