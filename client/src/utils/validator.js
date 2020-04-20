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

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;

function validateDate(date) {
     let today = new Date(new Date().getTime());
     let nextFiveDays = new Date(today.getTime() + ONE_DAY * 5);
     let nextTwoMonths = new Date(today.getTime() + ONE_MONTH * 2);

     let givenDate = new Date(date);
     if (givenDate >= nextFiveDays && givenDate <= nextTwoMonths) {
          return "";
     }
     return "Date should be between the next 5 days and the next 2 months";
}

function validateIntegerFields(context, ...fields) {
     for (let i = 0; i < fields.length; i ++) {
          if (!fields[i].match(/^\d+$/)) {
               return `${context} field should be integer`;
          }
     }
     return "";
}

function validateParticipantsCount(minCount, maxCount) {
     return (Number(minCount) > Number(maxCount)
          ? "Maximum participant count should not be lesser than minimum participant count"
          : "");
}

function getErrors(constraints, ...fields) {
     for (let i = 0; i < constraints.length; i ++) {
          let err = constraints[i](...fields);
          if (err.length != 0) {
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
          let err = getErrors(constraints, ...passwords);
          return err;
     },

     loginFieldChecker(email, password) {
          let constraints = [
               fieldsShouldNotBeEmpty,
          ];
          let err = getErrors(constraints, email, password);
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
               validateDate(activity.activityDate) ||
               validateIntegerFields(
                    "Participant counts",
                    activity.minParticipants,
                    activity.maxParticipants
               ) ||
               validateParticipantsCount(
                    activity.minParticipants, 
                    activity.maxParticipants);
          return err;
     }
}

export default validator;