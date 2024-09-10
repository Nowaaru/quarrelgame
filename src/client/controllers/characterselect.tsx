import React from "@rbxts/react";
import CharacterSelect from "client/ui/characterselect";

import { CharacterManager, Character } from "@quarrelgame-framework/common";
import { Controller, Modding, OnInit, OnStart } from "@flamework/core";
import { createRoot, createPortal } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { Client } from "./client";

export interface OnCharacterSelected {
    onCharacterSelected(charcter: Character.Character): void;
}

/*
 * The controller responsible for handling character selection
 * and attributing the selected character to the Client.
 *
 * Should have a priority of 1.
 */
@Controller({})
export default class CharacterSelectController implements OnStart, OnInit 
{
    public UIRoot = createRoot(new Instance("Folder"));

    public characterSelectSG = new Instance("ScreenGui");

    private currentCharacterSelect?: React.Element;;

    private currentlySelectedCharacter?: Character.Character;

    private readonly characterSelectedListeners = new Set<OnCharacterSelected>();

    constructor(protected CharacterManager: CharacterManager) 
    {}

    onInit() 
    {
        Modding.onListenerAdded<OnCharacterSelected>((listener) => {
            this.characterSelectedListeners.add(listener);
        });
    }

    onStart() 
    {
        this.characterSelectSG.Name = "CharacterSelect.ScreenGui"
        this.characterSelectSG.IgnoreGuiInset = true;
        this.characterSelectSG.Parent = Players.LocalPlayer.WaitForChild("PlayerGui");
        this.characterSelectSG.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;

        if (!Players.LocalPlayer.GetAttribute("SelectedCharacter"))

            this.OpenCharacterSelect();
    }

    public OpenCharacterSelect() 
    {
        if (!this.currentCharacterSelect) 
        {
            print("opening")
            this.UIRoot.render(
                createPortal(
                    <CharacterSelect
                        Characters={this.CharacterManager.GetCharacters()}
                        OnSelect={(selectedCharacter: Character.Character) => 
                        {
                            if (this.currentlySelectedCharacter && selectedCharacter === this.currentlySelectedCharacter) 

                                for (const listener of this.characterSelectedListeners)

                                    listener.onCharacterSelected(selectedCharacter);

                            else 
                                this.currentlySelectedCharacter = selectedCharacter;
                        }}
                     />, this.characterSelectSG)
            );
        }
    }

    public CloseCharacterSelect() {
        this.UIRoot.unmount();
    }
}

export { CharacterSelectController as CharacterSelectController };
