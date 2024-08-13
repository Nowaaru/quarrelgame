import { Dependency, Modding, OnInit, OnStart, Service } from "@flamework/core";
import { CommandService } from "@quarrelgame-framework/server";

// TODO: re-implement commands

@Service({})
export class CommandHandler
{
    constructor(protected commandHandler: CommandService)
    {}

    onStart(): void {
    }

    onInit(): void {
        this.commandHandler.Register(script);
    }
}
