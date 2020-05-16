import * as jwt from "jsonwebtoken";

import { User } from "./entity/User";
import TokenData from "./interfaces/tokenDataInterface";
import DataStoredInToken from "./interfaces/dataStoredInTokenInterface";

const ONE_HOUR = 3600;

// Utility function to create token
function createToken(user: User, secret: string): TokenData {
     const dataStoredInToken: DataStoredInToken = {
          id: user.id
     };

     return {
          expiresIn: ONE_HOUR,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn: ONE_HOUR })
     };
}

// Utility function to create cookie
function createCookie(tokenData: TokenData) {
     return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}

// --------------------------------------------------------------------------------
const cuhkSidRegex = "^1155[0-9]{6,6}$";

// Utility function to check if given sid is valid or not
function isValidSid(text: string) {
     const regExp = new RegExp(cuhkSidRegex);
     return regExp.test(text);
}

// Utility function to infer cuhk email from sid
function getEmail(sid: string) {
     if (isValidSid(sid)) {
          return `${sid}@link.cuhk.edu.hk`;
     }

     throw new Error(`Invalid SID, please enter a different SID`);
}

// --------------------------------------------------------------------------------
// Utility function to get current timestamp
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