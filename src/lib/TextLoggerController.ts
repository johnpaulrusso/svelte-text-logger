import type { ITextLoggerModel, ITextLoggerMessage, ITextLoggerMessageSegment } from "./TextLoggerModel";

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

    #parseMessageSegments(message: string) : Array<ITextLoggerMessageSegment>
    {
        let segments: Array<ITextLoggerMessageSegment> = [];
        let endIdxPrev: number = 0;
        
        Object.entries(this.model.styles).forEach(([key , _]) => {
            //Search the message for the style.
            let startIdx = message.search("<" + key + ">");
            let endIdx = message.search("</" + key + ">");

            if(startIdx != -1 && endIdx != -1)
            {
                //First, get any un-styled text that might be between style markers.
                let prevSubstring = message.substring(endIdxPrev, startIdx);
                if(prevSubstring)
                {
                    let segment: ITextLoggerMessageSegment = {
                        messageSegment: prevSubstring,
                        styleKey: ""
                    }
                    segments.push(segment);
                }
                //Then, get the styled text.
                let nextSubstring = message.substring(startIdx + key.length + 2, endIdx);
                if(nextSubstring)
                {
                    let segment: ITextLoggerMessageSegment = {
                        messageSegment: nextSubstring,
                        styleKey: key
                    }
                    segments.push(segment);
                }
                //Offset the end index by the length of the style marker.
                endIdxPrev = endIdx + key.length + 3;
            }
        });

        //If no styles were found, there is only a single segment.
        if(segments.length === 0)
        {
            let defaultMessageSegment: ITextLoggerMessageSegment = {
                messageSegment: message,
                styleKey: ""
            }
            segments.push(defaultMessageSegment);
        }
        //The remainder of the string is un-styled.
        else if(endIdxPrev < message.length)
        {
            let endSubstring = message.substring(endIdxPrev, message.length);
            if(endSubstring)
            {
                let segment: ITextLoggerMessageSegment = {
                    messageSegment: endSubstring,
                    styleKey: ""
                }
                segments.push(segment);
            }
        }

        return segments
    }
}