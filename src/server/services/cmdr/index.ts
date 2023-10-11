import { Dependency, Modding, OnInit, OnStart, Service } from "@flamework/core";
import { CommandController, CommandHandler, QuarrelCommands } from "@rbxts/quarrelgame-framework";

@Service({})
export class CommandService extends CommandHandler implements OnStart, OnInit
{
    constructor()
    {
        super(script);
    }
}
