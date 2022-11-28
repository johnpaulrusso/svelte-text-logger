export interface ITextLoggerModel
{
    messages: Array<ITextLoggerMessage>;
}

export interface ITextLoggerMessage
{
    datetime: Date;
    message: string;
}