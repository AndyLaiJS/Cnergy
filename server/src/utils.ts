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

export default { createToken, createCookie };