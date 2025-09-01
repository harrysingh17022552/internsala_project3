import { formatInTimeZone } from "date-fns-tz";
import { addDays } from "date-fns";

export const getDate = (daysToAdd = 0) => {
  const now = new Date();
  const dateWithOffset = addDays(now, daysToAdd);
  const timeZone = "Asia/Kolkata";
  const dateFormat = formatInTimeZone(dateWithOffset, timeZone, "yyyy-MM-dd");
  return dateFormat;
};