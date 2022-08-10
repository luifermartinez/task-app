import { Icon } from "@rneui/themed"
import { FC, useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ScrollView } from "react-native"
import { createTask, deleteTask, updateTask } from "../../api/task"
import { ICreateTaskInput, ITask } from "../../utils/interfaces"
import { TaskStatusNumber } from "../../utils/task"
import { errorToast, successToast } from "../../utils/toasts"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Label from "../ui/Label"
import Wrapper from "../ui/Wrapper"
import TaskHeader from "./TaskHeader"

/* Defining the props that the component will receive. */
interface Props {
  task?: ITask
  mutate: () => void
  handleClose: () => void
}

/* A React component that is used to create a task or edit a task. */
/* If a task is received will allow the user to edit the task. If not creates a task. */

const TaskForm: FC<Props> = ({ task, mutate, handleClose }) => {
  /* Destructuring the useForm hook. */
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ICreateTaskInput>({ mode: "onChange" })

  /* A state variable that is used to show a loading state when the user press on the save button. */
  const [loading, setLoading] = useState(false)

  /* Resetting the form when the task changes. */
  useEffect(() => {
    if (task) reset(task)
    if (!task)
      reset({
        content: "",
      })
  }, [task])

  /**
   * If the task is not received, create a task, otherwise update the task.
   * @param values - the form values
   * @returns The function save is being returned.
   */
  const save = (values) => {
    setLoading(true)
    if (!task) {
      createTask(values.content)
        .then(() => {
          successToast("Task saved")
          handleClose()
          reset({
            content: "",
          })
          mutate()
        })
        .catch((err) => {
          errorToast(err)
        })
        .finally(() => setLoading(false))
      return
    }
    updateTask({ ...task, content: values.content })
      .then(() => {
        successToast("Task saved")
        handleClose()
        reset({
          content: "",
        })
        mutate()
      })
      .catch((err) => {
        errorToast(err)
      })
      .finally(() => setLoading(false))
  }

  /* A function that is used to change the status of a task. */
  const changeStatus = useCallback(() => {
    if (!task) return
    updateTask({
      ...task,
      status:
        task.status === TaskStatusNumber.archived
          ? TaskStatusNumber.live
          : TaskStatusNumber.archived,
    })
      .then(() => {
        successToast("Task archived successfully")
        handleClose()
        reset({
          content: "",
        })
        mutate()
      })
      .catch((err) => errorToast(err))
  }, [task])

  /* A function that is used to change the status of a task. */
  const handleDone = useCallback(() => {
    if (!task) return
    updateTask({ ...task, status: TaskStatusNumber.done })
      .then(() => {
        successToast("Task done successfully")
        handleClose()
        reset({
          content: "",
        })
        mutate()
      })
      .catch((err) => errorToast(err))
  }, [task])

  /* A function that is used to delete a task. */
  const handleDelete = useCallback(() => {
    if (!task) return
    deleteTask(task)
      .then(() => {
        successToast("Task deleted successfully")
        handleClose()
        reset({
          content: "",
        })
        mutate()
      })
      .catch((err) => errorToast(err))
  }, [task])

  return (
    <Wrapper className="flex p-5 ">
      <ScrollView>
        <Wrapper className="flex flex-row justify-between items-center mb-3">
          <Label className="font-semibold text-sm text-gray-800 uppercase">
            {task ? "Edit Task" : "Create Task"}
          </Label>
          <Wrapper className="flex flex-row">
            <Button
              className="flex flex-row items-center mr-2 p-2"
              onPress={handleDelete}
            >
              <Icon
                name="trash"
                type="font-awesome"
                size={30}
                color="#FF5555"
              />
            </Button>
            {task && task.status === TaskStatusNumber.live && (
              <Button
                className="flex flex-row items-center p-2"
                onPress={changeStatus}
              >
                <Icon
                  name="archive"
                  type="font-awesome"
                  size={30}
                  color="gray"
                />
              </Button>
            )}
          </Wrapper>
        </Wrapper>
        {task && <TaskHeader task={task} />}
        <Input
          control={control}
          className="mt-5 rounded-3xl py-4 px-10 bg-gray-100 font-medium"
          placeholder="Write your task here"
          name="content"
          returnKeyType="next"
          multiline
          rules={{
            required: "Task is required",
          }}
          errors={errors}
        />
        <Button
          className="mt-5 bg-black rounded-full py-4 mr-2 flex items-center flex-row justify-center"
          activeOpacity={0.8}
          loading={loading}
          onPress={handleSubmit(save)}
        >
          <Label className="text-white font-bold">Save task</Label>
        </Button>
        {task && task.status === TaskStatusNumber.live && (
          <Button
            className="mt-5 bg-green-500 rounded-full py-4 mr-2 flex items-center flex-row justify-center"
            activeOpacity={0.8}
            loading={loading}
            onPress={handleDone}
          >
            <Icon name="check" type="font-awesome" size={20} color="white" />
            <Label className="text-white font-bold ml-2">Mark as Done</Label>
          </Button>
        )}
      </ScrollView>
    </Wrapper>
  )
}

export default TaskForm
