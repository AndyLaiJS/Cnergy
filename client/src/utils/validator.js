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

import { time } from "./constants";

function onlyAcceptDateInFixedRange(date) {
     let now = time.now();
     let range = [
          new Date(now + time.ONE_DAY * 5),
          new Date(now + time.ONE_MONTH * 2)
     ];
     let givenDate = new Date(date);

     if (givenDate >= range[0] && givenDate <= range[1]) {
          return "";
     }
     return "Date should be between the next 5 days and the next 2 months";
}

function onlyAcceptIntegers(context, ...fields) {
     for (let i = 0; i < fields.length; i ++) {
          if (!fields[i].match(/^\d+$/)) {
               return `${context} field should be integer`;
          }
     }
     return "";
}

function onlyAcceptAlphabeticCharacters(context, field) {
     for (let i = 0; i < field.length; i ++) {
          if ( (field[i] >= 'a' && field[i] <= 'z') ||
               (field[i] >= 'A' && field[i] <= 'Z') ) {
                    continue;
               }
          return `${context} field should only contains alphabetic characters`;
     }
     return "";
}

import { cuhk } from "./constants";

function onlyAcceptCUHKEmail(email) {
     const regExp = new RegExp(cuhk.EMAIL_REGEX);
     if (!regExp.test(email)) {
          return `${email} is not a valid CUHK Email`;
     }
     return "";
}

function validateParticipantsCount(minCount, maxCount) {
     return (Number(minCount) > Number(maxCount)
          ? "Maximum participant count should not be lesser than minimum participant count"
          : "");
}

var validator = {
     changePasswordChecker(...passwords) {
          let err = 
               fieldsShouldNotBeEmpty(...passwords) ||
               passwordShouldBeSame(...passwords);
          return err;
     },

     loginFieldChecker(email, password) {
          let err = fieldsShouldNotBeEmpty(email, password);
          return err;
     },

     signUpFieldChecker(user, confirmPassword) {
          let err = 
               fieldsShouldNotBeEmpty(
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.password,
                    user.college,
                    user.major,
               ) ||
               onlyAcceptAlphabeticCharacters(
                    "First name",
                    user.firstName,
               ) ||
               onlyAcceptAlphabeticCharacters(
                    "Last name",
                    user.lastName,
               ) ||
               onlyAcceptCUHKEmail(
                    user.email
               ) ||
               passwordShouldBeSame(
                    user.password, confirmPassword
               );
          return err;
     },

     createActivityChecker(activity) {
          let err = 
               fieldsShouldNotBeEmpty(
                    activity.name,
                    activity.description,
                    activity.activityDate,
                    activity.minParticipants,
                    activity.maxParticipants,
                    activity.type
               ) ||
               onlyAcceptDateInFixedRange(activity.activityDate) ||
               onlyAcceptIntegers(
                    "Participant counts",
                    activity.minParticipants,
                    activity.maxParticipants
               ) ||
               validateParticipantsCount(
                    activity.minParticipants, 
                    activity.maxParticipants);
          return err;
     },

     createClubChecker(club) {
          let err = 
               fieldsShouldNotBeEmpty(
                    club.name,
                    club.description
               );
          return err;
     },

     updateActivityChecker(description) {
          let err = 
               fieldsShouldNotBeEmpty(description);
          return err;
     } 
}

export default validator;