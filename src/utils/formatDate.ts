import dayjs, { type ConfigType } from "dayjs";

export const DATE_FORMAT = "D MMMM YYYY";
export const DATE_TIME_FORMAT = "D MMMM YYYY, HH:mm";

export const formatDate = (value: ConfigType, format = DATE_FORMAT) =>
  dayjs(value).format(format);
