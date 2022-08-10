/**
 * It takes a string date, converts it to a date object, then returns a string date in the format of
 * YYYY/MM/DD
 * @param {string} stringDate - string
 * @returns A function that takes a string and returns a string.
 */
export const getFormatedDate = (stringDate: string) => {
  const date = new Date(stringDate)
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  const year = date.getFullYear()
  return `${year}/${month}/${day}`
}
/**
 * It takes a string date, converts it to a Date object, gets the hours and minutes, and returns a
 * string with the hours and minutes separated by a colon.
 * @param {string} stringDate - string - the date you want to format
 * @returns A function that takes a string and returns a string.
 */

export const getFormatedTime = (stringDate: string) => {
  const date = new Date(stringDate)
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  return `${hour}:${minute}`
}
