export default function authenticationHeader() {
     let user = JSON.parse(localStorage.getItem("user"));
     
     if (user && user.accessToken) {
          return { Authorization: user.accessToken };
     } else {
          return {};
     }
}