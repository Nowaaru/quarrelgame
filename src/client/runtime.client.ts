import { Flamework } from "@flamework/core";
import QuarrelGameFramework from "@rbxts/quarrelgame-framework";
import "client/network";

QuarrelGameFramework.Initialize().then(() =>
{
    Flamework.addPaths("src/client/components");
    Flamework.addPaths("src/client/controllers");

    Flamework.ignite();
});
