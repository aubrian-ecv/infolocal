import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.locale("fr");

dayjs.extend(tz);
dayjs.extend(utc);
dayjs.extend(relativeTime);

export const dateTz = (date: string, format?: string, timezone?: string) => {
  if (format) {
    return dayjs(date)
      .utc()
      .tz(timezone ?? "Europe/Paris")
      .format(format);
  }
  return dayjs(date)
    .utc()
    .tz(timezone ?? "Europe/Paris");;
};
