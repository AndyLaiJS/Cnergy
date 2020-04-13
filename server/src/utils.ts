import * as jwt from "jsonwebtoken";

import { User } from "./entity/User";
import TokenData from "./interfaces/tokenDataInterface";
import DataStoredInToken from "./interfaces/dataStoredInTokenInterface";

const ONE_HOUR = 3600;

function createToken(user: User, secret: string): TokenData {
     const dataStoredInToken: DataStoredInToken = {
          id: user.id
     };

     return {
          expiresIn: ONE_HOUR,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn: ONE_HOUR })
     };
}

function createCookie(tokenData: TokenData) {
     return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}

// --------------------------------------------------------------------------------
const cuhkSidRegex = "^115511[0-9]{4,4}$";

function isValidSid(text: string) {
     const regExp = new RegExp(cuhkSidRegex);
     return regExp.test(text);
}

function getEmail(sid: string) {
     if (isValidSid(sid)) {
          return `${sid}@link.cuhk.edu.hk`;
     } else {
          throw new Error(`Invalid SID, please enter a different SID`);
     }
}

// --------------------------------------------------------------------------------
function getCurrentTimestamp() {
     let currTime = new Date();
     let year = currTime.getFullYear();
     let month = currTime.getMonth() + 1;
     let date = currTime.getDate();
     let hour = currTime.getHours();
     let minute = currTime.getMinutes();
     let second = currTime.getSeconds();

     return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

export default { createToken, createCookie, getEmail, getCurrentTimestamp };