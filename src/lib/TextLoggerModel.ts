export interface ITextLoggerModel
{
    messages: Array<ITextLoggerMessage>;
    fontFamily: string;
}

export interface ITextLoggerMessage
{
    datetime: Date;
    message: string;
}