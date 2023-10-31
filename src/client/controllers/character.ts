import { Controller, Dependency, OnInit, OnRender, OnStart } from "@flamework/core";
import {
    CharacterController2D,
    Entity,
    EntityAttributes,
    Map,
    MatchController,
    MatchPhase,
    MatchSettings,
    MatchState,
    OnArenaChange,
    OnMatchRespawn,
    OnMatchStart,
    ParticipantAttributes,
} from "@rbxts/quarrelgame-framework";
import { MotionInput } from "@rbxts/quarrelgame-framework";
import { Players } from "@rbxts/services";
import { Combat } from "client/controllers/combat";
import { Humanoid2D } from "client/controllers/humanoid";

@Controller({})
export class CharacterController extends CharacterController2D implements OnMatchRespawn, OnRender, OnArenaChange, OnStart, OnMatchStart
{
    constructor()
    {
        super(Dependency<Combat>(), Dependency<MotionInput.MotionInputController>(), Dependency<Humanoid2D>());
    }

    async onMatchRespawn(character: Model): Promise<void>
    {
        super.onMatchRespawn(character);
    }

    onMatchStart(matchId: string, matchData: ReturnType<MatchController["GetCurrentMatch"]>): void
    {
    }

    // TODO: Implement mechanic that only turns characters around mid-air
    // after a handful of frames (probably 8fr)
    onRender()
    {
        super.onRender();
        if (!this.character)
            return print("no character");

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
                        this.humanoidController.Rotate(
                            CFrame.lookAt(this.character.GetPivot().Position, otherParticipant.Character.GetPivot().Position).LookVector.mul(new Vector3(1, 0, 1)),
                        );
                    }
                }
                else if (participantsAmount === 1)
                    this.humanoidController.Rotate(CFrame.lookAt(this.character.GetPivot().Position, Origin.Value.Position).LookVector.mul(new Vector3(1, 0, 1)));
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

    declare protected humanoidController: Humanoid2D;
}
