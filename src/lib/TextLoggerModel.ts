export interface ITextLoggerModel
{
    messages: Array<ITextLoggerMessage>;
    fontFamily: string;
    styles: {[key: string]: string}
}

export interface ITextLoggerMessage
{
    datetime: Date;
    messageSegments: Array<ITextLoggerMessageSegment>;
}

export interface ITextLoggerMessageSegment
{
    messageSegment: string;
    styleKeys: Array<string>;
}