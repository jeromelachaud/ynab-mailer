const getYesterdaysDate = (today = new Date()) => {
  const date = new Date(today)
  date.setDate(date.getDate() - 1)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

const getFirstDateOfThePreviousMonth = (today = new Date()) => {
  const date = new Date(today)
  return `${date.getFullYear()}-${date.getMonth()}-1`
}

const getMondayOfThePreviousWeek = (today = new Date()) => {
  const date = new Date(today)
  const day = date.getDay()
  let prevMonday
  if (date.getDay() == 0) {
    prevMonday = date.getDate() - 7
  } else {
    prevMonday = date.getDate() - day - 6
  }

  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + `${prevMonday}`
  )
}

module.exports = {
  getYesterdaysDate,
  getFirstDateOfThePreviousMonth,
  getMondayOfThePreviousWeek,
}
