// import { isCuhkEmail, getErrorMessage } from "./utils";
// import firebase from "firebase/app";

// export async function handleSignIn(email, password) {
//      if (email.trim() === "")
//           throw Error("Email should not be empty")
//      if (password === "")
//           throw Error("Password should not be empty")
//      if (!isCuhkEmail(email))
//           throw Error("Please enter a valid CUHK email");

//      return new Promise((resolve, reject) => {
//           firebase.auth()
//                .signInWithEmailAndPassword(email, password)
//                .then((userCreds) => resolve(userCreds))
//                .catch((error) => reject(error)
//           );
//      });
// }

// export function userHasLoggedIn() {
//      var user = firebase.auth().currentUser;
//      if (user) {
//           return true;
//      }
//      return false;
// }

