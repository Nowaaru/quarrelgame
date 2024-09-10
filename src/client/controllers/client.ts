import { Controller, OnInit, OnStart } from "@flamework/core";
import { Players, StarterGui } from "@rbxts/services";

import { Client as QGFClient } from "@quarrelgame-framework/client";
import {  Character, CharacterManager } from "@quarrelgame-framework/common";
import { QuarrelFunctions } from "client/network";

import { CharacterSelectController, OnCharacterSelected } from "client/controllers/characterselect";

@Controller({})
export class Client
    extends QGFClient
    implements OnInit, OnCharacterSelected, OnStart
{
    constructor(
        public characterSelectController: CharacterSelectController,
        public characterManager: CharacterManager,
    ) {
        super();
    }

    onInit(): void 
    {
        super.onInit();

        Players.LocalPlayer.CameraMinZoomDistance = 8;
        Players.LocalPlayer.CameraMaxZoomDistance =
            Players.LocalPlayer.CameraMinZoomDistance;

        StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);
    }

    onStart()
    {
    }

    onCharacterSelected(character: Character.Character): void 
    {
        const characterId = this.characterManager.IdFromCharacter(character);
        assert(characterId, `character id ${characterId} not found`);

        QuarrelFunctions.SelectCharacter(characterId).then(async () =>
            QuarrelFunctions.Ready().then(() =>
                QuarrelFunctions.MatchTest()
                    .finally(() => this.characterSelectController.CloseCharacterSelect()),
            ),
        );
    }
}
