import { Flamework } from "@flamework/core";

Flamework.addPaths("node_modules/@quarrelgame-framework/server");
Flamework.addPaths("node_modules/@quarrelgame-framework/common");

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/server/components");
Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/data/character");

Flamework.ignite();
