import { time } from "./constants";

function getMonth(monthNumber) {
     for (let i = 0; i < time.MONTHS_IN_NUMBERS.length; i ++) {
          if (time.MONTHS_IN_NUMBERS[i] == monthNumber) {
               return time.MONTHS[i];
          }
     }
}

function getDay(year, month, date) {
     const index = new Date(`${month} ${date}, ${year}`).getDay();
     return time.DAYS[index];
}

var formatter = {
     getFormattedDate(date) {
          let year = date.slice(0, 4);
          let month = getMonth(date.slice(5, 7));
          let day = date.slice(8, 10);
          let hours = parseInt( date.slice(11, 13), 10 ) + 7;
          let minutes = date.slice(14, 16);
          let dayInWords = getDay(
               year, month, day
          );
          return `${dayInWords}, ${day} ${month} ${year} ${hours}:${minutes}`;
     },

     getFormattedName: (firstName, lastName) => `${lastName.toUpperCase()}, ${firstName}`,
}

export default formatter;