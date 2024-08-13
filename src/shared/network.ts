import { Networking } from "@flamework/networking";
import { QuarrelGameNetworking } from "@quarrelgame-framework/common";

interface QuarrelGameServerEvents {
}

interface QuarrelGameServerFunctions {

}

interface QuarrelGameClientEvents {

}

interface QuarrelGameClientFunctions {

}

export const GlobalEvents = Networking.createEvent<
    QuarrelGameServerEvents,
    QuarrelGameClientEvents
>();

export const GlobalFunctions = Networking.createFunction<
    QuarrelGameServerFunctions,
    QuarrelGameClientFunctions
>();

