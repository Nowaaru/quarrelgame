
import { MotionInput } from "@rbxts/quarrelgame-framework/out/shared/util/input";
import { Controller, OnStart } from "@flamework/core";
import { MotionInputController } from "./motioninput";
import { MotionInputHandling } from "@rbxts/quarrelgame-framework";

@Controller({})
export class TestMotionInputController implements MotionInputHandling, OnStart {
    constructor(protected motionInputController: MotionInputController)
    {}

    onStart()
    {
        print("motion input test controller started");
    }

    onMotionInputChanged(motionInput: MotionInput): void {
        warn(`Motion input changed. Current input: ${motionInput}.`);
    }

    onMotionInputTimeout(motionInput: MotionInput): void {
        warn(`Motion input timed out. Input before timeout: ${motionInput}.`);
    }
}
