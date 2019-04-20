const getYesterdaysDate = (today = new Date()) => {
  const date = new Date(today)
  date.setDate(date.getDate() - 1)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

const getFirstDateOfThePreviousMonth = (today = new Date()) => {
  const date = new Date(today)
  return `${date.getFullYear()}-${date.getMonth()}-1`
}

module.exports = { getYesterdaysDate, getFirstDateOfThePreviousMonth }
