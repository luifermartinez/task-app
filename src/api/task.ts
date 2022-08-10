import { TaskStatusNumber } from "./../utils/task"
import { IGetAllTasksInput, ITask } from "./../utils/interfaces"
import backendApi from "."
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  UPDATE_TASK,
} from "../constants/queries/task"

/**
 * It takes an input object, converts the status property to a number, and then sends it to the backend
 * @param {IGetAllTasksInput} input - IGetAllTasksInput
 * @returns An array of tasks.
 */
export const getAllTasks = async (input: IGetAllTasksInput) => {
  const res = await backendApi.post("", {
    query: GET_ALL_TASKS,
    variables: {
      input: {
        ...input,
        status: TaskStatusNumber[input.status],
      },
    },
  })
  if (res.data.errors) throw res.data.errors[0].message
  return res.data.data.getAllTasks
}

/**
 * It takes a string as an argument, sends a POST request to the backend, and returns the response
 * @param {string} content - string - the content of the task
 * @returns The data.data.createTask is the return value of the mutation.
 */
export const createTask = async (content: string) => {
  const { data } = await backendApi.post("", {
    query: CREATE_TASK,
    variables: {
      content: content.trim(),
    },
  })
  if (data.errors) throw data.errors[0].message
  return data.data.createTask
}

/**
 * It takes a task object, sends it to the backend, and returns the updated task object.
 * @param {ITask} task - ITask
 * @returns The updated task
 */
export const updateTask = async (task: ITask) => {
  const { data } = await backendApi.post("", {
    query: UPDATE_TASK,
    variables: {
      input: {
        content: task.content.trim(),
        id: task._id,
        status: task.status,
      },
    },
  })
  if (data.errors) throw data.errors[0].message
  return data.data.updateTask
}

/**
 * It takes a task object as an argument, and then it sends a request to the backend to delete the task
 * from the database.
 * @param {ITask} task - ITask
 * @returns The return value is the task that was deleted.
 */
export const deleteTask = async (task: ITask) => {
  const { data } = await backendApi.post("", {
    query: DELETE_TASK,
    variables: {
      id: task._id,
    },
  })
  if (data.errors) throw data.errors[0].message
  return data.data.deleteTask
}
