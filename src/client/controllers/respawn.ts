import { Controller, Dependency, OnStart } from "@flamework/core";
import { MatchController,  OnArenaChange } from "@quarrelgame-framework/client";
import { Players } from "@rbxts/services";
import { QGCharacterController } from "client/controllers/character";
import { Combat } from "client/controllers/combat";
import { PlatformCameraController2D } from "client/controllers/platformcamera2d";

@Controller({})
export class RespawnController2D implements OnStart, OnArenaChange
{
    constructor(
        private readonly cameraController: PlatformCameraController2D,
        // private readonly matchController: MatchController,
        private readonly combatController: Combat,
    )
    {
    }

    onStart(): void
    {
    }

    onArenaChanged()
    {
        // const currentMatch = this.matchController.GetMatchData();
        // assert(currentMatch, "current match is undefined");
        // assert(currentMatch.Arena, "match arena is undefined");
        //
        // this.cameraController.SetParticipants(
        //     ...currentMatch.Participants.mapFiltered((n) => n.ParticipantId).map((n) =>
        //         Players.GetPlayers().find((a) => a.GetAttribute("ParticipantId") === n)?.Character as Model
        //     ),
        // );
        //
        // this.cameraController.SetCameraEnabled(true);
        // this.combatController.Enable();
    }
}
