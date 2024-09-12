import { Controller, OnRender, OnStart } from "@flamework/core";
import { MotionInputHandling, OnMatchRespawn, Input as InputHandler} from "@quarrelgame-framework/client";
import { ConvertMoveDirectionToMotion, EntityState, Input, Motion, MotionInput } from "@quarrelgame-framework/common";
import { Managed, ICharacter } from "@quarrelgame-framework/types";

import type { QGCharacterController } from "./character";
import type { Combat } from "./combat";
import type { Client } from "./client";

import React from "@rbxts/react";
import { createRoot,createPortal} from "@rbxts/react-roblox";
import Training from "client/ui/training";
import {DisplayPositionHorizontal, DisplayPositionVertical } from "util/react";
import { Players } from "@rbxts/services";

const FrameDataColors = 
[
    [EntityState.Idle, Color3.fromRGB(255,255,0)],
    [EntityState.Startup, Color3.fromRGB(0,0,255)],
    [EntityState.Attack, Color3.fromRGB(255,0,0)],
    [EntityState.Recovery, Color3.fromRGB(0,255,0)],
    [EntityState.Landing, Color3.fromRGB(120,120,255)],
    [EntityState.Jumping, Color3.fromRGB(120,120,255)],

] as const;

@Controller({})
export class TrainingController implements /* KeyboardEvents, */ OnMatchRespawn, MotionInputHandling, OnStart 
{
    protected trainingIsEnabled = false;
    private trainingFrameDataHighlight = new Instance("Highlight")

    private TrainingUIRoot = createRoot(new Instance("Folder"))
    private TrainingScreenGui = new Instance("ScreenGui");

    private lastInput: string | undefined;
    private lastMotion: number = Motion.Neutral

    constructor(protected CharacterController: QGCharacterController, protected CombatController: Combat, protected Client: Client, protected Input: InputHandler)
    {}

    onStart()
    {
        const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
        this.TrainingScreenGui.Name = "Training"
        this.TrainingScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;
        this.TrainingScreenGui.ScreenInsets = Enum.ScreenInsets.DeviceSafeInsets

        this.TrainingScreenGui.Parent = PlayerGui;
        this.trainingFrameDataHighlight.Parent = PlayerGui;
    }

    onMotionInputChanged(motionInput: MotionInput): void
    {   
        const lastInput = motionInput[motionInput.size() - 1];
        if (lastInput)
        {
            const inputAsMotion: number | undefined = Motion[Motion[lastInput as never] as keyof typeof Motion] as number | undefined;
            const inputAsInput: string | undefined = Input[lastInput as never];
            
            if (inputAsMotion)
            {
                const moveDirection = this.CharacterController.GetMoveDirection();
                const adaptedMoveDirection = new Vector3(-(moveDirection.X + (math.abs(moveDirection.Z) > 0 ? moveDirection.Z : moveDirection.X)) / 2, moveDirection.Y)

                const motion = Motion[ConvertMoveDirectionToMotion(adaptedMoveDirection)[0]];
                this.lastMotion = motion;
            } else this.lastInput = Input[inputAsInput];

            this.RefreshTrainingUI();
        }
    }

    public RefreshTrainingUI()
    {
        this.TrainingUIRoot.render(
            createPortal(
                <Training
                    InputDisplayEnabled
                    BFInputDisplayPosition={DisplayPositionVertical.Bottom | DisplayPositionHorizontal.Left}

                    Input={this.lastInput as Input}
                    Motion={this.lastMotion as Motion}
                />, 
                this.TrainingScreenGui
            )
        )
    }

    public StartTrainingMode()
    {
        this.trainingIsEnabled = true;
        this.trainingFrameDataHighlight.Enabled = true;

        this.RefreshTrainingUI()
    }

    public EndTrainingMode()
    {
        this.trainingIsEnabled = false;
        this.trainingFrameDataHighlight.Enabled = false;
        this.lastStateChangedConnection?.Disconnect();
        this.lastStateChangedConnection = undefined;

        this.TrainingUIRoot.unmount()
    }

    onRender()
    {
        if (this.trainingIsEnabled)

            this.RefreshTrainingUI()
    }

    private lastStateChangedConnection?: RBXScriptConnection
    private spawnSymbol: string | undefined;
    onMatchRespawn(character: Managed<ICharacter>, player?: Player | undefined): void 
    {
        const spawnSymbol = this.spawnSymbol = tostring({});
        this.StartTrainingMode()
        this.trainingFrameDataHighlight.Adornee = character;
        let entity;
        do
        {
            entity = this.CharacterController.GetEntity();
            if (!entity)

                task.wait();
        }
        while (!entity)
        if (this.spawnSymbol !== spawnSymbol)

            return;

        this.lastStateChangedConnection?.Disconnect();
        this.lastStateChangedConnection = entity.instance.AttributeChanged.Connect(() =>
        {
            for (const [state, color] of FrameDataColors)
            {
                if ((entity.attributes.State & state) > 0)
                {
                    const [h,s,v] = Color3.toHSV(color);
                    this.trainingFrameDataHighlight.FillColor = color;
                    this.trainingFrameDataHighlight.OutlineColor = Color3.fromHSV(h,s,v - (20 / 255));
                }
            }
        });
    }

}
