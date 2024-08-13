
import { Dependency } from "@flamework/core";
import { ResourceController } from "@quarrelgame-framework/client";
import { Jump, QuarrelMaps, QuarrelFunctions as QGFFunctions, QuarrelEvents as QGFEvents } from "@quarrelgame-framework/common";
import { GlobalFunctions, GlobalEvents } from "shared/network";
import { Players } from "@rbxts/services";
import { ICharacter } from "@quarrelgame-framework/types";

export const Events = GlobalEvents.createClient({});
export const Functions = GlobalFunctions.createClient({});

export const QuarrelEvents = QGFEvents.createClient({disableIncomingGuards: true});
export const QuarrelFunctions = QGFFunctions.createClient({disableIncomingGuards: true});

export interface OnFrame
{
    /**
     * Runs everytime a Game frame passes.
     */
    onFrame(frameTime: number, tickRate: number): void;
}

const onFrameListeners: Set<OnFrame> = new Set();
QuarrelEvents.Tick.connect(async (frameTime: number, tickRate: number) =>
{
    for (const listener of onFrameListeners)
        listener.onFrame(frameTime, tickRate);
});
QuarrelFunctions.RequestLoadMap.setCallback((mapId: string) =>
{
    return new Promise((res) =>
    {
        assert(QuarrelMaps.FindFirstChild(mapId), `Map ${mapId} does not exist.`);
        Dependency<ResourceController>()
            .requestPreloadInstances(
                QuarrelMaps.FindFirstChild(mapId)!.GetDescendants(),
            )
            .then(() =>
            {
                res(true);
            });
    });
});

QuarrelEvents.Jump.connect((jumpPower) => {
    Jump(Players.LocalPlayer.Character as ICharacter, jumpPower);
});
