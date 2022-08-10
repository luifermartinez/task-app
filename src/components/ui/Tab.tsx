import { FC } from "react"
import { scale } from "../../utils/dimension"
import Button from "./Button"
import Label from "./Label"

interface Props {
  label: string
  active?: boolean
  onSelect: () => void
}
/**
 * Tab is a component that takes in a label, active, and onSelect prop and returns a button that has a
 * label inside of it.
 * @param  - label - the text to display on the tab
 * @param  - active - boolean that determines if the tab is active or not
 * @param  - onSelect - function that is called when the tab is selected
 * @returns A React component
 */
const Tab: FC<Props> = ({ label, active, onSelect }) => {
  return (
    <Button
      onPress={onSelect}
      className={`p-3 ${active ? "border-b-2 border-b-indigo-500" : ""}`}
      activeOpacity={0.6}
    >
      <Label
        className={`${
          active ? "text-indigo-500" : "text-gray-400"
        } uppercase font-medium text-[${scale(13)}px]`}
      >
        {label}
      </Label>
    </Button>
  )
}

export default Tab
