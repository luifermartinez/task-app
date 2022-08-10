import { useCallback, useEffect, useState } from "react"
import { getAllTasks } from "../../api/task"
import { ITask } from "../interfaces"
import { errorToast } from "../toasts"

/**
 * It fetches tasks from the server and returns the tasks, loading state, total number of tasks, a
 * function to set the tasks, loading more state, a function to fetch more tasks, and a function to
 * mutate the tasks.
 * @param  - activeTab - the current tab that is active
 * @returns An object with the following properties:
 * tasks: ITask[]
 * loading: boolean
 * total: number
 * setTasks: (tasks: ITask[]) => void
 * loadingMore: boolean
 * fetchMore: () => void
 * mutate: () => void
 */

const useFetchTasks = ({ activeTab }) => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const fetchTasks = useCallback(() => {
    if (page === 1) setLoading(true)
    else setLoadingMore(true)

    getAllTasks({ status: activeTab, limit, page })
      .then((res) => {
        if (page === 1) {
          setTasks(res.tasks)
          setTotal(res.total)
        } else {
          setTasks([...tasks, ...res.tasks])
        }
        setTotal(res.total)
      })
      .catch((err) => {
        errorToast(err)
      })
      .finally(() => {
        if (page === 1) setLoading(false)
        else setLoadingMore(false)
      })
  }, [page, limit, activeTab])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(() => {
    setPage(1)
    setTasks([])
  }, [activeTab])

  const fetchMore = useCallback(() => {
    if (page * limit < total) {
      setPage(page + 1)
    }
  }, [page, limit, total])

  const mutate = () => {
    setTasks([])
    setPage(1)
    fetchTasks()
  }

  return { tasks, loading, total, setTasks, loadingMore, fetchMore, mutate }
}

export default useFetchTasks
