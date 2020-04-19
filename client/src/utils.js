export function getParsedToken(rawToken) {
     let tokenWithAuthorization = rawToken.split(";")[0]
     let token = tokenWithAuthorization.split("=")[1];
     return token;
}