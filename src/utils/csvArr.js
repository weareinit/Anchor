/**
 * Returns a 2d array of rows x cols of hackers info
 * @param {Object} applicants - hacker object
 */
const getCSVArr = applicants => {
  let CSVData = [];
  const headers = [
    "First Name",
    "Last Name",
    "Email",
    "School",
    "Major",
    "Area of Focus",
    "Graduation Year",
    "Level of Study",
    "Gender",
    "Race",
    "Phone Number",
    "Need Travel Reimbursement?",
    "Shirt Size",
    "GitHub",
    "LinkedIn",
    "Resume",
    "How you heard About us?",
    "Reason for Attending?",
    "Dietary Restrictions"
  ];
  CSVData[0] = headers;

  // fields
  const fields = [
    "firstName",
    "lastName",
    "email",
    "schoolName",
    "major",
    "areaOfFocus",
    "graduationYear",
    "levelOfStudy",
    "gender",
    "race",
    "phoneNumber",
    "needReimbursement",
    "shirtSize",
    "github",
    "linkedIn",
    "resume",
    "howDidYouHear",
    "reasonForAttending",
    "dietaryRestriction"
  ];

  // for each applicant / hacker, add a new row of fields
  applicants.forEach(element => {
    let row = [];

    fields.map((field, i) => {
      row.push(element[field]);
    });

    CSVData.push(row);
  });

  return CSVData;
};
export default getCSVArr;
