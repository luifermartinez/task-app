import { FC } from "react"
import { getFormatedDate, getFormatedTime } from "../../utils/date"
import { ITask } from "../../utils/interfaces"
import Label from "../ui/Label"
import Wrapper from "../ui/Wrapper"

/* It's defining three constants that are arrays of strings. */
const statusColors = ["text-green-500", "text-gray-400", "text-red-500"]
const statusBackgroundColors = ["bg-green-100", "bg-gray-100", "bg-red-100"]
const statusText = ["Live", "Done", "Archived"]

/**
 * It's a React component that takes a task object as a prop and returns a styled div with a label
 * inside.
 * 
 * The task object has a status property that is used to determine the background color and text color
 * of the div and label.
 * 
 * The statusBackgroundColors and statusColors objects are used to determine the background color and
 * text color of the div and label.
 * 
 * The statusText object is used to determine the text of the label.
 * 
 * The Wrapper and Label components are styled elements.
 * 
 * The Wrapper component has a className prop that is a string that is a combination of the
 * statusBackgroundColors object and the statusColors object.
 * 
 * The Label component has a className prop that is a string that is a combination of the statusColors
 * object and the statusText object.
 * 
 * The Wrapper component has a className prop that
 * @param  - ITask = {
 * @returns A React component
 */
const TaskStatus: FC<{ task: ITask }> = ({ task }) => {
  const { status } = task
  return (
    <Wrapper className={`flex items-center p-1 ${statusBackgroundColors[status]} rounded-3xl px-4`}>
      <Label
        className={`${statusColors[status]} uppercase text-sm font-medium`}
      >
        {statusText[status]}
      </Label>
    </Wrapper>
  )
}

/**
 * It's a React functional component that takes an object of type ITask as a prop and returns a Wrapper
 * with two children, one of which is another React functional component that takes an object of type
 * ITask as a prop and returns a div with a child of type Label
 * @param  - FC<{ task: ITask }>
 * @returns A React component
 */

const TaskHeader: FC<{ task: ITask }> = ({ task }) => {
  return (
    <Wrapper className="flex flex-row justify-between items-center">
      <TaskStatus task={task} />
      <Label className="font-medium text-sm text-gray-400">
        {getFormatedDate(task.createdAt)} {getFormatedTime(task.createdAt)}
      </Label>
    </Wrapper>
  )
}

export default TaskHeader
