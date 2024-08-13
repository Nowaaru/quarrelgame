import { Dependency, Modding, OnInit, OnStart, Reflect, Service } from "@flamework/core";
import { TestService } from "./testservice";
import { QuarrelGame } from "@quarrelgame-framework/server";
import Characters from "data/character";


@Service({})
export class Game implements OnInit, OnStart
{
    constructor(private quarrelGame: QuarrelGame, private testService: TestService)
    {

    }

    onInit(): void | Promise<void> {
        print("qg:", this.quarrelGame);
    }

    onStart(): void {
        print("Quarrel Game Example started.");
        this.quarrelGame.SetCharacters(Characters);
        this.testService.tryMatchTest();
    }
}
