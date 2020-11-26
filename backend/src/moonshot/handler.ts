
import { arg, pipe, prop } from 'ts-functional';
import { IEnv, IEvent, IPath } from '../../api';
import { get, post, withResponse } from '../../wrappers';
import { db } from "../dynamodb/serverless-client";
import { highScoresTable } from './tables';

const handler = (resolve, reject) => (err, response) => {
  if(err) {
    reject(err)
  } else {
    resolve(response);
  }
}

interface IHighScore {
  id: string;
  level: string;
  userName: string;
  score: number;
  deltaVs: any[];
  validationHash: string;
}

const loadHighScores = (level:string):Promise<IHighScore[]> => new Promise((resolve, reject) => {
  // TODO: Get top X high scores only for each level
  // Option: only save the top X high scores
  db.doc.get({TableName: highScoresTable.TableName, Key: {id: level}}, (err, data) => {
    if(err || typeof data.Item === "undefined") {
      console.log(`Some error message`);
      reject(withResponse(404, `Some error message`));
    } else {
      console.log(`Got high scores for level ${level}`);
      console.log(data.Item);
      resolve(data.Item as IHighScore[]);
    }
  });
});
export const getHighScores = get<any>(pipe(arg<IPath>(0), prop("level"), loadHighScores));

export const postHighScore = post<any>(async (body:any, path:IPath, env:IEnv, event:IEvent<any>) =>
  new Promise((resolve, reject) => {
    if(!body) {reject(withResponse(400, `There was an error parsing the board data`));}
    else {
      console.log(body);
      let parsedBody:IHighScore | null = null;
      try {
        parsedBody = JSON.parse(body) as IHighScore;
      } catch (e) {
        reject(withResponse(400, e));
        return;
      }
      const score:IHighScore = parsedBody;
      console.log(score);
      if(!score) {reject(withResponse(400, "No high score data submited"));}
      else if(typeof score.validationHash === "undefined") {reject(withResponse(400, "Error creating board: validationHash is required"));}
      // TODO: Other validations, including validation hash confirmation
      else {
        db.doc.put({TableName: highScoresTable.TableName, Item: score}, (err:any) => {
          if(err) {
            reject(withResponse(500, `There was an error saving your high score: ${err}`));
          } else {
            resolve("High score saved");
          }
        });
      }
    }
  })
);
export const postValidate = post<any>(async (body:any, path:IPath, env:IEnv, event:IEvent<any>) =>
  // TODO: Run simulation and return a salted validation hash if the solution is valid
);

export const postInit = post<any>(async (body:any, path:IPath, env:IEnv, event:IEvent<any>) =>
  new Promise((resolve, reject) => {
    console.log("Creating tables");
      db.raw.createTable(highScoresTable, (err:any) => {
        if(err) {console.log(err); return;}
        console.log("High scores table created");
        resolve("High scores table created");
      });
  })
);
