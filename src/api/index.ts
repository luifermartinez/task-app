import axios, { AxiosRequestConfig } from "axios"
import environment from "../../environment"
import { store } from "../redux/store"

/* Creating a new instance of axios with the baseURL set to the value of the environment.BACKEND_URL
variable. */
const backendApi = axios.create({
  baseURL: environment.BACKEND_URL,
})

/* Adding the token to the header of the request. */
backendApi.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (store.getState().token) {
      const token = store.getState().token
      if (token) {
        config.headers.Authorization = "Bearer " + token
      }
    }
    return config
  }
)

export default backendApi
