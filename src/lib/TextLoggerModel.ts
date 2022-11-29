export interface ITextLoggerModel
{
    config: ITextLoggerConfiguration;
    messages: Array<ITextLoggerMessage>;
    styles: {[key: string]: string}
}

export interface ITextLoggerConfiguration
{
    defaultStyle: string;
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
