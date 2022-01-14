import moment from "moment";

const DEFAULT_DATE_FORMAT = "YYYY.MM.DD";

export const formatDateFromUnixTimestamp = (
  unixTimestamp,
  format = DEFAULT_DATE_FORMAT
) => {
  const dateTime = moment.unix(unixTimestamp);
  if (dateTime.isValid()) {
    return dateTime.format(format);
  }
};

export const formatDateFromIsoDate = (
  dateString,
  format = DEFAULT_DATE_FORMAT
) => {
  const dateTime = moment(dateString);
  if (dateTime.isValid()) {
    return dateTime.format(format);
  }
};
