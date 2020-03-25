var cuhkEmailRegex = "^115511[0-9]{4,4}(@link.cuhk.edu.hk)$";

export function isCuhkEmail(str) {
     var regExp = new RegExp(cuhkEmailRegex);
     return regExp.test(str);
}