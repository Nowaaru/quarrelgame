import { Components } from "@flamework/components";
import { Dependency, OnInit, OnStart, Service } from "@flamework/core";
import { Players, RunService, Workspace } from "@rbxts/services";
import {
    ArenaTypeFlags,
    QuarrelGame,
    MatchService,
    Participant,
    Match,
} from "@quarrelgame-framework/server";
import { QuarrelFunctions } from "server/network";

@Service({})
export class TestService implements OnStart, OnInit {
    constructor(
        private matchService: MatchService,
        private quarrelGame: QuarrelGame,
    ) { }

    private match?: Match;

    private readonly testParticipant: Promise<Participant> = new Promise(
        (res) => {
            Players.PlayerAdded.Once((player) =>
                res(Dependency<Components>().waitForComponent(player, Participant)),
            );
        },
    );

    onInit() {
        // this.deployJaneModel();
    }

    public deployJaneModel() {
        if (true) return false;
        /*
            const janeModel = Character.CharacterModel.jane.Clone();
            janeModel.SetAttribute("CharacterId", "Vannagio");
            janeModel.PivotTo(new CFrame(Vector3.FromAxis(Enum.Axis.Z).mul(5)));
    
            const janeCombatant = Dependency<Components>().addComponent(
                janeModel,
                Entity.Combatant,
            );
            const janeRotator = Dependency<Components>().addComponent(
                janeModel,
                Entity.EntityRotator,
            );
            RunService.Stepped.Connect(() =>
            {
                janeModel.Humanoid.WalkSpeed = 0;
                const targetPlayer = Players.GetPlayers()[0]?.Character;
                if (targetPlayer)
                {
                    janeModel.Humanoid.Move(targetPlayer.GetPivot().LookVector);
                    janeRotator.RotateTowards(targetPlayer.PrimaryPart);
                }
            });
            */
    }

    public tryMatchTest(match: Match) {
        // TODO: add match.ready check
        // so the player doesn't have
        // to insta-select their character
        // within 4 seconds ugh...

        print("we cogging");
        match.Ready.Once(() => {
            print("ok we're gaming");
            if (match) match.StartMatch();
        });


        this.match = match;
        return true;
    }

    onStart() {
        Players.PlayerAdded.Once(async (player) => {
            this.tryMatchTest(
                this.matchService.CreateMatch({
                    Participants: [
                        await Dependency<Components>().waitForComponent<Participant>(
                            player,
                        ),
                    ],
                    Settings: {
                        Map: "happyhome",
                        ArenaType: ArenaTypeFlags.ALLOW_2D,
                    },
                }),
            );
        });
    }
}
