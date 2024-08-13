import { Flamework } from "@flamework/core";
import "server/network";

Flamework.addPaths("node_modules/@quarrelgame-framework/server/services");
Flamework.addPaths("node_modules/@quarrelgame-framework/server/components");

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/server/components");
Flamework.addPaths("src/shared/components");

Flamework.ignite();
