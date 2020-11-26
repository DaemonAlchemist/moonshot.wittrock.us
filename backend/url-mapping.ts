import {mappings as moonshotMappings} from './src/moonshot/url-mappings';

export interface IAMStatement {
    Effect: string;
    Action: string | string[];
    Resource: string | string[];
}
export type Mapping = [string, string, string, (IAMStatement[])?];

export const mappings = (baseUrl:string, srcBase:string):Mapping[] => [
    ...moonshotMappings(`${baseUrl}/moonshot`, `${srcBase}/src/moonshot`),
];
