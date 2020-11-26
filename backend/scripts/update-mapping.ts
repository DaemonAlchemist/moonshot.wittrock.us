import { _, split, filter, trim } from 'atp-pointfree';
import {format} from 'simple-json-formatter';
import { readFileSync, writeFileSync } from 'fs';
import {mappings} from '../url-mapping';
import {config} from 'dotenv';

config();

const expName = (handler:string) => handler.replace(/[\.\/]/g, "");

writeFileSync("serverless.json", format(JSON.stringify({
    ...JSON.parse(readFileSync("serverless.json").toString()),
    functions: mappings("", ".")
        .map(([action, url, handler, iamRoleStatements]) => ({
            [`${action}${expName(handler).replace("handler", "").substr(3)}`]: {
                handler: `index.${expName(handler)}`,
                events: [
                    {http: {
                        path: url,
                        method: action,
                        cors: true,
                    }}
                ],
                iamRoleStatements,
            }
        }))
}), "  "));

writeFileSync("index.ts", mappings("", ".").map(([action, url, handler]) => {
    const imp = handler.split(".").pop();
    const impFile = handler.split(".").slice(0, -1).join(".");
    const exp = expName(handler);
    return `export {${imp} as ${exp}} from "${impFile}";`;
}).join("\n"));
