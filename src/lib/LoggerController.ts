import type { ILoggerModel, ILogMessage } from "./LoggerModel";

export class LoggerController
{
    model: ILoggerModel

    /** Create an empty model. */
    constructor()
    {
        this.model = {messages: []};
    }

    LogString(message: string)
    {
        let logMessage: ILogMessage = {
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