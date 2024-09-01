import { Controller, Modding, OnRender, OnStart } from "@flamework/core";
import {

    CharacterController2D,
    Input,
    MatchController,
    OnArenaChange,
    OnMatchRespawn,
    OnRespawn,
    OnMatchStart,
} from "@quarrelgame-framework/client";

import { Players } from "@rbxts/services";
import { Client } from "./client";

print("MC:", MatchController)

@Controller({})
export class QGCharacterController extends CharacterController2D implements OnRespawn, OnMatchRespawn, OnRender, OnArenaChange, OnStart, OnMatchStart
{
    constructor(protected client: Client, protected humanoidController: Humanoid2D, protected matchController: MatchController, protected input: Input)
    {
        super(client, humanoidController, matchController, input);
    }

    async onMatchRespawn(character: Model): Promise<void>
    {
        print("hmmmmmmmmmmm");
        super.onMatchRespawn(character);
    }

    onMatchStart()
    {

    }

    // TODO: Implement mechanic that only turns characters around mid-air
    // after a handful of frames (probably 8fr)
    onRender()
    {
        super.onRender();
        const currentEntity = this.GetEntity();

        if (!currentEntity)
            return;

        if (this._arena)
        {
            const { Origin, Axis } = this._arena.config;
            const matchData = this.matchController.GetMatchData();
            if (matchData)
            {
                const { MatchId } = matchData;
                const allParticipants = Players.GetPlayers().filter((n) => n.GetAttribute("MatchId") === MatchId);

                const participantsAmount = allParticipants.size();
                const otherParticipant = allParticipants.find((n) => n !== this.player);

                if (participantsAmount === 2)
                {
                    if (otherParticipant?.Character)
                    {
                        currentEntity.Rotate(
                            CFrame.lookAt(currentEntity.instance.GetPivot().Position, otherParticipant.Character.GetPivot().Position).LookVector.mul(new Vector3(1, 0, 1)),
                        );
                    }
                }
                else if (participantsAmount === 1)
                    currentEntity.Rotate(CFrame.lookAt(currentEntity.instance.GetPivot().Position, Origin.Value.Position).LookVector.mul(new Vector3(1, 0, 1)));
                else
                {
                    print(
                        "bad match participant count:",
                        participantsAmount,
                        `match id: ${MatchId} / ${Players.GetPlayers().mapFiltered((n) => n.GetAttribute("MatchId")).join(":: ")}`,
                    );
                }
            }
            else
            {
                print("no match data");
            }
        }
        else
        {
            print("no arena");
        }
    }
}
