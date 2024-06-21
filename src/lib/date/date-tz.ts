import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(tz);
dayjs.extend(utc);

export const dateTz = (date: string, format: string, timezone: string) => {
    return dayjs(date).utc().tz(timezone).format(format);
}