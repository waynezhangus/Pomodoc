import { parseISO, formatDistanceToNow } from 'date-fns'
/**
 * Formats a number of minutes as 'mm:00'.
 *    minutesToDuration(3) = '03:00'
 *    minutesToDuration(45) = '45:00'
 */

export function minutesToDuration(givenMinutes) {
  const minutes = Math.floor(givenMinutes).toString().padStart(2, "0");
  return `${minutes}:00`;
}

/**
 * Formats a number of seconds as 'mm:ss'.
 *    secondsToDuration(305) = '05:05'
 *    secondsToDuration(930) = '15:30'
 */

export function secondsToDuration(givenSeconds) {
  const minutes = Math.floor((givenSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.round(givenSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function TimeDiff(timestamp) {
  let timeDiff = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date, {addSuffix: true})
    timeDiff = `due ${timePeriod}`
  }
  return timeDiff
}