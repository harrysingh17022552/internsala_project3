import { formatInTimeZone } from "date-fns-tz";
import { addDays } from "date-fns";

//this function return the date according to my format I have set here, this will help me to make date range while calling API with from day weather to other day weather
export const getDate = (daysToAdd = 0) => {
  const now = new Date();
  const dateWithOffset = addDays(now, daysToAdd);
  const timeZone = "Asia/Kolkata";
  const dateFormat = formatInTimeZone(dateWithOffset, timeZone, "yyyy-MM-dd");
  return dateFormat;
};
