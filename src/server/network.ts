import { GlobalFunctions, GlobalEvents } from "shared/network";
import { QuarrelFunctions as QGFFunctions, QuarrelEvents as QGFEvents } from "@quarrelgame-framework/common";

export const Events = GlobalEvents.createServer({});
export const Functions = GlobalFunctions.createServer({});

export const QuarrelEvents = QGFEvents.createServer({disableIncomingGuards: true});
export const QuarrelFunctions = QGFFunctions.createServer({disableIncomingGuards: true});
