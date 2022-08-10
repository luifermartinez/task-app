import Label from "./ui/Label"
import Wrapper from "./ui/Wrapper"

/* An array of months. */
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
]

/* An array of days of the week. */
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
// Header component of the dashboard task list
const HeaderComponent = () => {
  /* Getting the current date and formatting it. */
  const date = new Date()
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const stringDay = days[date.getDay()]

  return (
    <Wrapper className="flex justify-between flex-row mt-20">
      <Wrapper className="flex flex-row">
        <Label className="text-5xl mr-1">{day}</Label>
        <Wrapper>
          <Label className="font-bold text-sm">{month}</Label>
          <Label className="font-bold text-sm text-gray-400">{year}</Label>
        </Wrapper>
      </Wrapper>
      <Label className="text-lg mr-1 uppercase text-indigo-500 font-bold">
        {stringDay}
      </Label>
    </Wrapper>
  )
}

export default HeaderComponent
