export const validateTime = (time) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return timeRegex.test(time);
};

export const validateFile = (file) => {
  return file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
};

console.log(validateTime("12:2:12"))