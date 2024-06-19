import { Dependency, OnInit, OnStart, Service } from "@flamework/core";
import { TestService } from "./testservice";
import { QuarrelGame } from "@rbxts/quarrelgame-framework";
import Characters from "data/character";

@Service({})
export class Game implements OnInit, OnStart
{
    protected quarrelGame!: QuarrelGame;

    protected TestService!: TestService;

    onInit(): void | Promise<void> {
        this.quarrelGame = Dependency<QuarrelGame>();
        this.TestService = Dependency<TestService>();
    }

    onStart(): void {
        print("Quarrel Game Example started.");
        this.quarrelGame.SetCharacters(Characters);
        this.TestService.tryMatchTest();
    }
}
