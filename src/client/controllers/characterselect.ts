import { CharacterSelectController } from "@rbxts/quarrelgame-framework";
import { Controller, Dependency, OnInit } from "@flamework/core";
import Characters from "data/character";

@Controller({})
export class CharacterSelect implements OnInit {
    constructor(private readonly CharacterSelectController: CharacterSelectController)
    {}

    onInit()
    {
        this.CharacterSelectController.SetCharacters(Characters);
    }


}
