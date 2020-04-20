function passwordShouldBeSame(...passwords) {
     if (passwords.length == 2) {
          return (passwords[0] != passwords[1]
               ? "Password does not matched"
               : "");
     }
     return "";
}

function fieldsShouldNotBeEmpty(...fields) {
     for (let i = 0; i < fields.length; i ++) {
          if (fields[i] == "") {
               return "Fields should not be empty";
          }
     }
     return "";
}

function getErrors(constraints, ...fields) {
     for (let i = 0; i < constraints.length; i ++) {
          let err = constraints[i](...fields);
          if (err.length != 0) {
               console.log(err);
               return err;
          }
     }
     return "";
}

var validator = {
     changePasswordChecker(...passwords) {
          let constraints = [
               fieldsShouldNotBeEmpty,
               passwordShouldBeSame,
          ];
          for (let i = 0; i < constraints.length; i ++ ) {
               let err = constraints[i](...passwords);
               if (err.length != 0) {
                    return err;
               }
          }
     },

     loginFieldChecker(email, password) {
          let constraints = [
               fieldsShouldNotBeEmpty,
          ];
          let err = getErrors(constraints, email, password);
          return err;
     }
}

export default validator;