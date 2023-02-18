export interface ITextLoggerModel
{
    config: ITextLoggerConfiguration;
    messages: Array<ITextLoggerMessage>;
    styles: {[key: string]: string};
    inhibitAutoScrolling: boolean;
}

export interface ITextLoggerConfiguration
{
    defaultStyle: string;
    backgroundColor: string;
    controlbarColor: string;
    controlbarButtonColor: string;
    controlbarButtonHoverStyle: string;
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
