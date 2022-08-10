// Defining all the interfaces that are used in the application

export interface IUser {
  name: string
  createdAt: string
  email: string
  updatedAt: string
  _id: string
}

export interface IError {
  message: string
}

export interface ILoginInput {
  email: string
  password: string
}

export interface ISignInput {
  name: string
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
  user: IUser
}

export interface ITab {
  label: string
  code: "live" | "done" | "archived"
}

export interface IGetAllTasksInput {
  status: "live" | "done" | "archived"
  page: number
  limit: number
}

export interface ITask {
  _id: string
  content: string
  user: IUser
  createdAt: string
  updatedAt: string
  status: number
}

export interface ICreateTaskInput {
  content: string
}

export interface IUpdateTaskInput {
  id: string
  content: string
  status: string
}
