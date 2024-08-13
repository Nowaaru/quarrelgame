
import { Controller, OnStart } from "@flamework/core";
import { Combat } from "./combat";
import { MotionInput } from "@quarrelgame-framework/common";
import { MotionInputHandling } from "@quarrelgame-framework/client";

@Controller({})
export class TestMotionInputController implements MotionInputHandling, OnStart {
    constructor(protected motionInputController: Combat)
    {}

    onStart()
    {
        print("motion input test controller started");
    }

    onMotionInputChanged(motionInput: MotionInput): void {
        // warn(`Motion input changed. Current input: ${motionInput}.`);
    }

    onMotionInputTimeout(motionInput: MotionInput): void {
        // warn(`Motion input timed out. Input before timeout: ${motionInput}.`);
    }
}
