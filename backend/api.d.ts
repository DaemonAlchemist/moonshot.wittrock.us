export declare type Maybe<T> = T | null;

export declare interface IPath {
    [key:string]:string;
}

export declare interface IQuery {
    [key:string]: string | string[];
}

export declare interface IEnv {

}

export declare interface IEvent<T> {
    body:T;
    multiValueQueryStringParameters: Maybe<{
        [key:string]: string[];
    }>;
    pathParameters: Maybe<{
        [key:string]: string;
    }>;
    queryStringParameters: Maybe<{
        [key:string]: string;
    }>;
}

export declare interface IError {
    statusCode:number;
    msg:string;
}

export declare interface IApiGatewayResponse {
    statusCode: number;
    headers?: {
        [header:string]:string | boolean;
    }
    body:string;
}

export declare type GetFunction<T> = (path:Maybe<IPath>, query:Maybe<IQuery>, env:IEnv, event:IEvent<null>) => T;
export declare type PostFunction<T> = (body:T, path:Maybe<IPath>, env:IEnv, event:IEvent<T>) => T;
export declare type PutFunction<T> = (body:T, path:Maybe<IPath>, env:IEnv, event:IEvent<T>) => T;
export declare type PatchFunction<T> = (body:Partial<T>, path:Maybe<IPath>, env:IEnv, event:IEvent<Partial<T>>) => T;
export declare type DeleteFunction = (path:Maybe<IPath>, env:IEnv, event:IEvent<null>) => null;
