import moment from "moment";

const DEFAULT_DATE_FORMAT = "YYYY.MM.DD";

export const formatDateFromUnixTimestamp = (
  unixTimestamp: number,
  format: string = DEFAULT_DATE_FORMAT
): string => {
  const dateTime = moment.unix(unixTimestamp);
  if (dateTime.isValid()) {
    return dateTime.format(format);
  }
};

export const formatDateFromIsoDate = (
  dateString: string,
  format: string = DEFAULT_DATE_FORMAT
): string => {
  const dateTime = moment(dateString);
  if (dateTime.isValid()) {
    return dateTime.format(format);
  }
};
