import { Icon } from "@rneui/themed"
import Label from "../ui/Label"
import Wrapper from "../ui/Wrapper"

// Component that renders a Icon and a Message when the task list is empty.
const TasksEmpty = () => {
  return (
    <Wrapper className="flex">
      <Icon name="minus" type="font-awesome" size={50} color="gray" />
      <Label className="text-gray-400 font-medium text-center mt-3">
        No tasks found
      </Label>
    </Wrapper>
  )
}

export default TasksEmpty
