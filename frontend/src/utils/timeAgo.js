import { parseISO, formatDistanceToNow } from 'date-fns'

export default function TimeAgo(timestamp) {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date, {addSuffix: true})
    if (timestamp < Date.now()) {
      timeAgo = `due ${timePeriod} ago`
    } else {
      timeAgo = `due ${timePeriod}`
    }
  }
  return timeAgo
}