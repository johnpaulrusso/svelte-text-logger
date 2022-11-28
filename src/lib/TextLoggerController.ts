import type { ITextLoggerModel, ITextLoggerMessage } from "./TextLoggerModel";

export class TextLoggerController
{
    model: ITextLoggerModel

    /** Create an empty model. */
    constructor()
    {
        this.model = {messages: []};
    }

    LogString(message: string)
    {
        let logMessage: ITextLoggerMessage = {
            datetime: new Date(),
            message: message
        }

        this.model.messages.push(logMessage);
    }

    Clear()
    {
        this.model.messages = [];
    }
}