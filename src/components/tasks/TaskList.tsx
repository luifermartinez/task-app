import { FC, useCallback } from "react"
import { ActivityIndicator, FlatList, RefreshControl } from "react-native"
import Task from "./Task"
import Label from "../ui/Label"
import Wrapper from "../ui/Wrapper"
import TasksEmpty from "./TasksEmpty"
import { ITask } from "../../utils/interfaces"
import ListHeader from "./ListHeader"
import { updateTask } from "../../api/task"
import { TaskStatusNumber } from "../../utils/task"
import { errorToast } from "../../utils/toasts"

/* Defining the props that the TaskList component will take in. */
interface Props {
  selectTask: (task: ITask) => void
  loading: boolean
  tasks: ITask[]
  fetchMore: () => void
  loadingMore: boolean
  mutate: () => void
}

// TaskList is a component that takes in a selectTask, loading, tasks, fetchMore, loadingMore, and mutate prop and returns a flatlist that has a list of tasks.

const TaskList: FC<Props> = ({
  selectTask,
  fetchMore,
  loading,
  loadingMore,
  mutate,
  tasks,
}) => {
  /* A function that returns a wrapper component that has an activity indicator and a label that says
  loading if loadingMore is true. */
  const renderSpinner = useCallback(() => {
    return loadingMore ? (
      <Wrapper className="flex flex-row items-center justify-center py-3">
        <ActivityIndicator size="small" color="gray" />
        <Label className="ml-3 font-medium text-sm">Loading...</Label>
      </Wrapper>
    ) : null
  }, [loadingMore])

  /**
   * "When the user press the done button, update the task status to done, then refresh the list of
   * tasks."
   *
   * The function is called when the user press the done button.
   *
   * The function takes a task as a parameter.
   *
   * The function calls the updateTask function, passing in the task with the status changed to done.
   *
   * The function then calls the mutate function to refresh the list of tasks.
   *
   * The function catches any errors and displays them in a toast.
   * @param {ITask} task - ITask - this is the task object that is passed in from the parent component.
   */
  const handleDone = (task: ITask) => {
    updateTask({ ...task, status: TaskStatusNumber.done })
      .then(() => mutate())
      .catch((err) => errorToast(err))
  }

  /**
   * HandleUndone is a function that takes a task as an argument and returns a promise that updates the
   * task's status to live and then mutates the data.
   * @param {ITask} task - ITask - this is the task object that is passed in from the parent component
   */
  const handleUndone = (task: ITask) => {
    updateTask({ ...task, status: TaskStatusNumber.live })
      .then(() => mutate())
      .catch((err) => errorToast(err))
  }

  return (
    <Wrapper className="mt-4 h-1/2">
      <FlatList
        renderItem={({ item }) => (
          <Task
            task={item}
            handleDone={() => handleDone(item)}
            handleUndone={() => handleUndone(item)}
            edit={() => selectTask(item)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={mutate} />
        }
        onEndReached={fetchMore}
        ListFooterComponent={renderSpinner}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={!loading && TasksEmpty}
        onEndReachedThreshold={0.3}
        data={tasks}
        keyExtractor={(item) => item._id}
      />
    </Wrapper>
  )
}

export default TaskList
