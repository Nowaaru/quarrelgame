
import { Dependency } from "@flamework/core";
import { Jump } from "@rbxts/quarrelgame-framework";
import type { Frames } from "@rbxts/quarrelgame-framework";
import { ClientEvents, ClientFunctions, ResourceController, QuarrelMaps } from "@rbxts/quarrelgame-framework";
import { Players } from "@rbxts/services";

export interface OnFrame
{
    /**
     * Runs everytime a Game frame passes.
     */
    onFrame(frameTime: Frames, tickRate: number): void;
}

const onFrameListeners: Set<OnFrame> = new Set();
ClientEvents.Tick.connect(async (frameTime: Frames, tickRate: number) =>
{
    for (const listener of onFrameListeners)
        listener.onFrame(frameTime, tickRate);
});

ClientFunctions.RequestLoadMap.setCallback((mapId: string) =>
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

ClientEvents.Jump.connect((jumpPower) => {
    Jump(Players.LocalPlayer.Character as any, jumpPower);
});

export const Events = ClientEvents;
export const Functions = ClientFunctions;
