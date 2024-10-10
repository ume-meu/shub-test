export const validateTime = (time) => {
  const trimmedTime = time.trim();
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return timeRegex.test(trimmedTime);
};

export const trimTime = (time) => {
  return time.trim();
}

export const validateFile = (file) => {
  return file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
};

let start = "21:10:28	".trim();
let end = "21:10:28\t".trim();
console.log(start.length, start);  // Output will be 8, "21:10:28"
console.log(end.length, end);
