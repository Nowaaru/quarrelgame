import { Dependency } from "@flamework/core";
import { Cmdr, CommandContext } from "@rbxts/cmdr";
import { TestService } from "server/services/testservice";

export = function(context: CommandContext, ...args: unknown[])
{
    const newMatch = Dependency<TestService>().tryMatchTest();
    if (newMatch)
    {
        return "Test match started.";
    }

    return "No test match started.";
};
