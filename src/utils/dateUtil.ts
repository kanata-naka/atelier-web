import moment from "moment";

const DEFAULT_DATE_FORMAT = "YYYY.MM.DD";

/**
 * UNIXタイムスタンプを指定した書式にフォーマットする
 */
export const formatDateFromUnixTimestamp = (
  unixTimestamp: number,
  format: string = DEFAULT_DATE_FORMAT
) => {
  const dateTime = moment.unix(unixTimestamp);
  if (dateTime.isValid()) {
    return dateTime.format(format);
  }
};

/**
 * ISO形式の日時を指定した書式にフォーマットする
 */
export const formatDateFromIsoDate = (
  dateString: string,
  format: string = DEFAULT_DATE_FORMAT
) => {
  const dateTime = moment(dateString);
  if (dateTime.isValid()) {
    return dateTime.format(format);
  }
};
