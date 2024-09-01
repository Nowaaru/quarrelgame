import { Flamework, Modding } from "@flamework/core";
import { MatchController } from "@quarrelgame-framework/client";

// Flamework.addPaths("node_modules/@quarrelgame-framework/client/out/controllers");
Flamework.addPaths("node_modules/@quarrelgame-framework/client");
Flamework.addPaths("node_modules/@quarrelgame-framework/common");

Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/components");
Flamework.addPaths("src/shared/components");


Flamework.ignite();
