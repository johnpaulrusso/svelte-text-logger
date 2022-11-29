import type { ITextLoggerModel, ITextLoggerMessage, ITextLoggerMessageSegment } from "./TextLoggerModel";

const STARTING_TAG_REGEX: string = "(<[a-zA-Z0-9]+>){1}";
const ENDING_TAG_REGEX: string = "(<\/[a-zA-Z0-9]+>){1}";

export class TextLoggerController
{
    model: ITextLoggerModel

    /** Create an empty model. */
    constructor()
    {
        this.model = {messages: [], fontFamily: "'Courier New', Courier, monospace", styles: {}};
    }
    
    AddStyle(key: string, style: string)
    {
        this.model.styles[key] = style;
    }

    LogString(message: string)
    {
        let logMessage: ITextLoggerMessage = {
            datetime: new Date(),
            messageSegments: []
        }

        logMessage.messageSegments = this.#parseMessageSegments(message);

        this.model.messages.push(logMessage);
    }

    Clear()
    {
        this.model.messages = [];
    }

    #parseMessageSegments(message: string, initialStyles: Array<string> = []) : Array<ITextLoggerMessageSegment>
    {
        let segments: Array<ITextLoggerMessageSegment> = [];

        let startingTagStartPosition = message.search("(<){1}");
        let startingTagEndPosition = message.search("(>){1}");

        if(startingTagEndPosition > startingTagStartPosition)
        {
            let tagName = message.substring(startingTagStartPosition+1, startingTagEndPosition);
            let tempRemainder = message.substring(startingTagEndPosition);
            let offsetEndTagPosition = tempRemainder.search("(<\/" + tagName + ">){1}");

            if(offsetEndTagPosition != -1)
            {
                let endingTagStartPosition = startingTagEndPosition + offsetEndTagPosition;
                let endingTagEndPosition = endingTagStartPosition + tagName.length + 3; //3 is offset of "<\>"

                let precusor: string = message.substring(0, startingTagStartPosition);
                let inner: string = message.substring(startingTagEndPosition+1, endingTagStartPosition);
                let remainder = message.substring(endingTagEndPosition);

                let precursorSegment: ITextLoggerMessageSegment = {
                    messageSegment: precusor,
                    styleKeys: initialStyles
                }
                segments.push(precursorSegment);
                segments = segments.concat(this.#parseMessageSegments(inner, initialStyles.concat([tagName])));
                segments = segments.concat(this.#parseMessageSegments(remainder, initialStyles));
            }
        }
        else
        {
            let defaultFullSegment: ITextLoggerMessageSegment = {
                messageSegment: message,
                styleKeys: initialStyles
            }
            segments.push(defaultFullSegment);
        }

        return segments
    }

}
