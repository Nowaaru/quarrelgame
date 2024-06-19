import { Character, CharacterSelectController, ClientFunctions, OnCharacterSelected } from "@rbxts/quarrelgame-framework";
import { Controller, Dependency, OnInit } from "@flamework/core";
import Characters from "data/character";

@Controller({})
export class CharacterSelect implements OnInit, OnCharacterSelected {
    constructor(private readonly CharacterSelectController: CharacterSelectController)
    {}

    onCharacterSelected(character: Character.Character): void {
        task.wait(2);
        ClientFunctions.Ready();
    }

    onInit()
    {
        this.CharacterSelectController.SetCharacters(Characters);
    }
}
