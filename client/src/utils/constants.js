const time =  {
	ONE_HOUR: 3600 * 1000,
	ONE_DAY: 24 * 3600 * 1000,
	ONE_MONTH: 30 * 24 * 3600 * 1000,

     MONTHS: [
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
     ],
     MONTHS_IN_NUMBERS: [
          "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
     ],
     DAYS : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
     ],

	now: function () {
		return new Date().getTime();
     },
};

const cuhk = {
     EMAIL_REGEX: "^115511[0-9]{4,4}(@link.cuhk.edu.hk)$",
     COLLEGES: [
          "Chung Chi College",
          "C.W Chu College",
          "Lee Woo Sing College",
          "Morningside College",
          "Shaw College",
          "S.H. Ho College",
          "United College",
          "Wu Yee Sun College"
     ],
     MAJOR_CODES: [
          "AIST - Artificial Intelligence: Systems and Technologies",
          "BMEG - Biomedical Engineering",
          "CENG - Computer Engineering",
          "CSCI - Computer Science",
          "EEEN - Energy and Environmental Engineering",
          "ELEG - Electronic Engineering",
          "FTEC - Financial Technology",
          "IERG - Information Engineering",
          "MAEG - Mechanical and Automation Engineering",
          "MIE - Mathematics and Information Engineering",
          "SEEM - Systems Engineering and Engineering Management",
     ],
}

export { time, cuhk };