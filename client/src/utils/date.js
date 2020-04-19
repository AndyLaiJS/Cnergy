function getMonth(monthNumber) {
     let numbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
     let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
     ];
     for (let i = 0; i < numbers.length; i ++) {
          if (numbers[i] == monthNumber) {
               return months[i];
          }
     }
}

function getDay(year, month, date) {
     let day = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
     ];
     const offset = new Date(`${month} ${date}, ${year}`).getDay();
     return day[offset];
}

var date = {
     getFormattedDate(date) {
          let year = date.slice(0, 4);
          let month = getMonth(date.slice(5, 7));
          let day = date.slice(8, 10);
          let hours = parseInt( date.slice(11, 13), 10 ) + 7;
          let minutes = date.slice(14, 16);

          let dayInWord = getDay(
               year, month, day
          );
          return `${dayInWord}, ${day} ${month} ${year} ${hours}:${minutes}`;
     }
}

export default date;