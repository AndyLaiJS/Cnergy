"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const ONE_HOUR = 3600;
function createToken(user, secret) {
    const dataStoredInToken = {
        id: user.id
    };
    return {
        expiresIn: ONE_HOUR,
        token: jwt.sign(dataStoredInToken, secret, { expiresIn: ONE_HOUR })
    };
}
function createCookie(tokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}
const cuhkSidRegex = "^115511[0-9]{4,4}$";
function isValidSid(text) {
    const regExp = new RegExp(cuhkSidRegex);
    return regExp.test(text);
}
function getEmail(sid) {
    if (isValidSid(sid)) {
        return `${sid}@link.cuhk.edu.hk`;
    }
    else {
        throw new Error(`Invalid SID, please enter a different SID`);
    }
}
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
exports.default = { createToken, createCookie, getEmail, getCurrentTimestamp };
//# sourceMappingURL=utils.js.map