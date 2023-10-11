import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { PlatformCameraController2D } from "client/controllers/platformcamera2d";
import { MatchController, OnArenaChange } from "@rbxts/quarrelgame-framework"
import { Combat } from "./combat";

@Controller({})
export class RespawnController2D implements OnStart, OnArenaChange
{
    constructor(private readonly cameraController: PlatformCameraController2D, private readonly matchController: MatchController, private readonly combatController: Combat)
    {
    }

    onStart(): void
    {
    }

    onArenaChanged()
    {
        const currentMatch = this.matchController.GetCurrentMatch();
        assert(currentMatch, "current match is undefined");
        assert(currentMatch.Arena, "match arena is undefined");

        this.cameraController.SetParticipants(
            ...currentMatch.Participants.mapFiltered((n) => n.ParticipantId).map((n) =>
                Players.GetPlayers().find((a) => a.GetAttribute("ParticipantId") === n)?.Character as Model
            ),
        );
        this.cameraController.SetCameraEnabled(true);
        this.combatController.Enable()
        
    }
}
