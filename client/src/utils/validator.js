function passwordShouldNotBeEmpty(password, confirmPassword) {
     return (password == "" || confirmPassword == ""
          ? "Password should not be empty"
          : ""); 
}
function passwordShouldBeSame(password, confirmPassword) {
     return (password != confirmPassword
          ? "Password does not matched"
          : "");
}

var validator = {
     changePasswordChecker(password, confirmPassword) {
          let constraints = [
               passwordShouldNotBeEmpty,
               passwordShouldBeSame
          ];
          for (let i = 0; i < constraints.length; i ++ ) {
               let err = constraints[i](password, confirmPassword);
               if (err.length != 0) {
                    return err;
               }
          }
     }
}

export default validator;