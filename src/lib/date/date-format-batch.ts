import dayjs from "dayjs";

const timezoneOffset = new Date().getTimezoneOffset();

export default (date: Date | string) => dayjs(date).subtract(timezoneOffset, "minutes");