export interface ILoggerModel
{
    messages: Array<ILogMessage>;
}

export interface ILogMessage
{
    datetime: Date;
    message: string;
}