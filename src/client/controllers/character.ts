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

@Controller({})
export class QGCharacterController extends CharacterController2D implements OnRespawn, OnMatchRespawn, OnRender, OnArenaChange, OnStart, OnMatchStart
{
    constructor(protected client: Client,  protected matchController: MatchController, protected input: Input)
    {
        super(client, matchController, input);
    }

    async onMatchRespawn(character: Model): Promise<void>
    {
        super.onMatchRespawn(character);
        this.enabled = true;
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
        if (currentEntity)
        {
            if (currentEntity.IsNegative())

                return;

            this.EntityFacingLogic(currentEntity);
        }
    }

    public EntityFacingLogic(currentEntity = this.GetEntity())
    {
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

                const currentEntityPosition = currentEntity.instance.GetPivot().Position;

                if (participantsAmount === 2)
                {
                    if (otherParticipant?.Character)
                    {
                        currentEntity.Rotate(
                            CFrame.lookAt(currentEntityPosition, otherParticipant.Character.GetPivot().Position).LookVector.mul(new Vector3(1, 0, 1)),
                        );
                    }
                }
                else if (participantsAmount === 1)
                {
                    const originPosition = Origin.Value.Position;
                    const leveledEntityPosition = currentEntityPosition.mul(new Vector3(1,0,1)).add(Origin.Value.Position.mul(new Vector3(0,1)));
                    const directionToOrigin = (originPosition.sub(leveledEntityPosition)).Unit;
                    if (directionToOrigin.Dot(Axis.Value) < 0)

                        currentEntity.Rotate(Axis.Value.mul(-1))

                    else 

                        currentEntity.Rotate(Axis.Value);
                }
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
