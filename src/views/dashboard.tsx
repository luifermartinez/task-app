import styles from "../styles/global.styles"
import Wrapper from "../components/ui/Wrapper"
import HeaderComponent from "../components/Header"
import { SafeAreaView } from "react-native"
import { useState } from "react"
import tabs from "../utils/tabs"
import Tabs from "../components/Tabs"
import TaskList from "../components/tasks/TaskList"
import DashboardFooter from "../components/DashboardFooter"
import TaskBottomSheet from "../components/tasks/TaskBottomSheet"
import { ITask } from "../utils/interfaces"
import useFetchTasks from "../utils/hooks/useFetchTasks"

const Dashboard = () => {
  /* Setting the active tab to live. */
  const [activeTab, setActiveTab] = useState<"live" | "done" | "archived">(
    "live"
  )
  /* Destructuring the useFetchTasks hook. */
  const { loading, tasks, fetchMore, loadingMore, mutate } = useFetchTasks({
    activeTab,
  })
  /* Setting the initial state of the `isOpen` variable to false, this state manage if is open or not the bottom sheet task. */
  const [isOpen, setIsOpen] = useState(false)
  // functions to open and close the bottom sheet task
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  // state for the selected task
  const [task, setTask] = useState<ITask>()

  /**
   * SelectTask is a function that takes a task as an argument and sets the task state to the task
   * argument and sets the isOpen state to true.
   * @param {ITask} task - ITask - this is the task that is selected
   */
  const selectTask = (task: ITask) => {
    setTask(task)
    setIsOpen(true)
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Wrapper className="h-full flex p-8">
        <HeaderComponent />
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <TaskList
          selectTask={selectTask}
          loading={loading}
          fetchMore={fetchMore}
          loadingMore={loadingMore}
          mutate={mutate}
          tasks={tasks}
        />
        <DashboardFooter handleOpen={handleOpen} />
      </Wrapper>
      <TaskBottomSheet
        isOpen={isOpen}
        handleClose={handleClose}
        task={task}
        selectTask={setTask}
        mutate={mutate}
      />
    </SafeAreaView>
  )
}

export default Dashboard
