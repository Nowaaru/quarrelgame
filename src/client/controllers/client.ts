import { Controller, OnInit } from "@flamework/core";
import { Players, StarterGui } from "@rbxts/services";

import {
    Client as QGFClient,
    CharacterSelectController,
    OnCharacterSelected,
} from "@quarrelgame-framework/client";
import {  Character, CharacterManager } from "@quarrelgame-framework/common";
import { QuarrelFunctions } from "client/network";

@Controller({})
export class Client
    extends QGFClient
    implements OnInit, OnCharacterSelected
{
    constructor(
        protected characterSelectController: CharacterSelectController,
        protected characterManager: CharacterManager,
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
