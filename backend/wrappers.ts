import { GetFunction, IApiGatewayResponse, IEvent, PostFunction } from './api';

export const error = (statusCode:number, msg:string) => ({statusCode, msg});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',        
  'Access-Control-Allow-Credentials': true,        
};

const catchErrors = async <T>(f:() => Promise<T>):Promise<IApiGatewayResponse> => {
    return await f()
        .then((response:T):IApiGatewayResponse => ({
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(response),
        }))
        .catch(e => {
            if(typeof e.statusCode !== 'number' || (typeof e.message !== 'string' && typeof e.msg !== 'string')) {
              e.message = `Something bad happened. I don't know what else to tell you. :( -- ${JSON.stringify(e)}`;
              e.statusCode = 500;
            }
            return {
                statusCode: e.statusCode,
                headers: corsHeaders,
                body: JSON.stringify(process.env.ENV === "local"
                  ? {message: e.message || e.msg, details: e, env: process.env}
                  : {message: e.message || e.msg}
                ),
            };
        });
}

export const withResponse = (statusCode:number, msg:string) => {
  console.log(`${statusCode}: ${msg}`)
  return {statusCode, msg};
}

export const get = <T>(f:GetFunction<T>) => async (event:IEvent<null>):Promise<IApiGatewayResponse> => {
  const query = event.multiValueQueryStringParameters
  return catchErrors<T>(async () => f(
    event.pathParameters,
    !!query ? Object.keys(query).reduce((params:any, key:string) => ({
      ...params,
      [key]: query[key].length > 1 ? query[key] : query[key][0],
    }), {}) : null,
    process.env,
    event
  ));
};
  
export const post = <T>(f:PostFunction<T>) => async (event:IEvent<T>):Promise<IApiGatewayResponse> => {
  const query = event.multiValueQueryStringParameters
  return catchErrors<T>(async () => f(
    event.body,
    event.pathParameters,
    process.env,
    event
  ));
};
