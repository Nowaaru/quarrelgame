import { Flamework, Modding } from "@flamework/core";
import { MatchController } from "@quarrelgame-framework/client";

Flamework.addPaths("node_modules/@quarrelgame-framework/client/controllers");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/components");
Flamework.addPaths("src/shared/components");


Flamework.ignite();
