export default class User {
     constructor(
          firstName = "",
          lastName = "",
          email = "",
          password = "",
          college = "",
          gender = "",
          major = "",
     ) {
          this.firstName = firstName;
          this.lastName = lastName;
          this.email = email;
          this.password = password;
          this.college = college;
          this.major = major;
          this.gender = gender;
          this.about = "";
     }
}