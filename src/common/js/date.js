export function formatDate (date, fmt) {
  date = new Date(date)
  let year = date.getFullYear()
  let month = date.getMonth()
  let month1 = month + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minutes = date.getMinutes()

  return fmt.replace(/yyyy/g, year)
            .replace(/yy/g, (year + '').substring(2))
            .replace(/MM/g, month1 < 10 ? '0' + month1 : month1)
            .replace(/m(\W+)/g, month1 + '$1')
            .replace(/dd/g, day < 10 ? '0' + day : day)
            .replace(/hh/g, hour < 10 ? '0' + hour : hour)
            .replace(/mm/g, minutes < 10 ? '0' + minutes : minutes)
            .replace(/d(\W+)/g, day + '$1')
}
