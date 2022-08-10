import { Icon } from "@rneui/themed"
import { FC } from "react"
import { ITask } from "../../utils/interfaces"
import { TaskStatusNumber } from "../../utils/task"
import Button from "../ui/Button"
import Label from "../ui/Label"
import Wrapper from "../ui/Wrapper"

/* A type definition for the props that the component will receive. */
interface Props {
  task: ITask
  handleDone: () => void
  handleUndone: () => void
  edit: () => void
}

// Task is a component that renders a task and his status.
// if the user longpress the task, the task will be editable.

const Task: FC<Props> = ({ task, handleDone, handleUndone, edit }) => {
  return (
    <Button
      className="p-3 m-1 flex justify-between flex-row mb-3 bg-white shadow-sm rounded-lg"
      activeOpacity={0.8}
      onLongPress={edit}
      delayLongPress={400}
    >
      <Wrapper className="w-5/6 ">
        <Label
          className={`font-semibold text-sm ${
            task.status === 1 ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {task.content}
        </Label>
      </Wrapper>
      <Wrapper>
        {task.status === TaskStatusNumber.done ? (
          <Wrapper>
            <Button
              className="border-green-500 border-2 rounded-full p-1"
              onPressIn={handleUndone}
              activeOpacity={0.6}
            >
              <Icon
                name="check"
                type="font-awesome"
                size={12}
                color="#22C55E"
              />
            </Button>
          </Wrapper>
        ) : (
          <Button onPressIn={handleDone} activeOpacity={0.6}>
            <Icon name="radio-btn-passive" type="fontisto" color="lightgray" />
          </Button>
        )}
      </Wrapper>
    </Button>
  )
}

export default Task
