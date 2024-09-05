import { Dependency, Modding, OnInit, OnStart, Reflect, Service } from "@flamework/core";
import { TestService } from "./testservice";
import { QuarrelGame } from "@quarrelgame-framework/server";

/*
 * TODO: look into turning quarrelGame import into a decorator in quarrelgame-framework
 */
@Service({})
export class Game implements OnStart
{
    constructor(private quarrelGame: QuarrelGame, private testService: TestService)
    {

    }

    onStart(): void {
        print("Quarrel Game Example started.");
    }
}
