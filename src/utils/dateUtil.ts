import moment from "moment";

const DEFAULT_DATE_FORMAT = "YYYY.MM.DD";

export function formatDateFromUnixTimestamp(unixTimestamp: number, format: string = DEFAULT_DATE_FORMAT) {
  const dateTime = moment.unix(unixTimestamp);
  if (dateTime.isValid()) {
    return dateTime.format(format);
  }
}

export function formatDateFromIsoDate(dateString: string, format: string = DEFAULT_DATE_FORMAT) {
  const dateTime = moment(dateString);
  if (dateTime.isValid()) {
    return dateTime.format(format);
  }
}
