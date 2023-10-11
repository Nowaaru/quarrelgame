import { Dependency, OnInit, OnStart, Service } from "@flamework/core";
import { QuarrelGame } from "@rbxts/quarrelgame-framework";
import Characters from "data/character";

@Service({})
export class Game implements OnInit, OnStart
{
    protected quarrelGame!: QuarrelGame;

    onInit(): void | Promise<void> {
        this.quarrelGame = Dependency<QuarrelGame>();
    }

    onStart(): void {
        print("Quarrel Game Example started.");
        this.quarrelGame.SetCharacters(Characters);
    }
}
