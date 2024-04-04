import { Flamework } from "@flamework/core";
import QuarrelGameFramework from "@rbxts/quarrelgame-framework";

QuarrelGameFramework.Initialize().then(() =>
{
    Flamework.addPaths("src/server/components");
    Flamework.addPaths("src/server/services");
    Flamework.addPaths("src/shared/components");

    Flamework.ignite();
});
