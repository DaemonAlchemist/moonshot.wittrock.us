import { Mapping } from "../../url-mapping";

const iamStatements = () => [{
    Effect: "Allow",
    Action: "*",
    Resource: "*",
}]

export const mappings = (baseUrl:string, srcBase:string):Mapping[] => [
    ['POST', `${baseUrl}/init`,       `${srcBase}/handler.postInit`,      iamStatements()],
    ['POST', `${baseUrl}/validate`,   `${srcBase}/handler.postValidate`,  iamStatements()],
    ['POST', `${baseUrl}/high-score`, `${srcBase}/handler.postHighScore`, iamStatements()],
    ['GET',  `${baseUrl}/high-score`, `${srcBase}/handler.getHighScores`, iamStatements()],
];
