export const validateTime = (time) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return timeRegex.test(time);
};

export const validateFile = (file) => {
  const fileExtension = /(\.xlsx)$/i;
  const mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  // Check if file name has .xlsx or not
  const validExtension = fileExtension.test(file.name);

  // Check the file MIME type (image/png is a MIME type)
  const validMimeType = file.type === mimeType;

  // Return true if both conditions are met
  return validExtension && validMimeType;
};
