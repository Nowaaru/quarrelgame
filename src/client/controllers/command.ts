import { Controller } from "@flamework/core";

@Controller({})
export class CommandController {
    SetKeys(...keys: Enum.KeyCode[])
    {}
}
