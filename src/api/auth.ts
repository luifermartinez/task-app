import { ISignInput } from "./../utils/interfaces"
import backendApi from "."
import { LOG_OUT, SIGN_IN, SIGN_UP } from "../constants/queries/auth"
import { ILoginInput } from "../utils/interfaces"

/**
 * This function makes a request to the backend API, and if there are no errors, it returns the data.
 * Otherwise, it throws an error.
 * @param {ILoginInput} input - ILoginInput
 * @returns The return value is the data.data.login object.
 */
export const makeLogin = async (input: ILoginInput) => {
  const { data } = await backendApi.post("", {
    query: SIGN_IN,
    variables: {
      input,
    },
  })

  if (data.errors) throw data.errors[0].message
  return data.data.login
}

/**
 * It makes a POST request to the backend API, and if the response is successful, it returns the data.
 * @returns The data.data.logout is the return value of the mutation.
 */
export const makeLogout = async () => {
  const { data } = await backendApi.post("", {
    query: LOG_OUT,
  })

  if (data.errors) throw data.errors[0].message
  return data.data.logout
}

/**
 * It takes an input object, sends it to the backend, and returns the response.
 * @param {ISignInput} input - ISignInput = {
 * @returns The data object is being returned.
 */
export const makeSignUp = async (input: ISignInput) => {
  try {
    const { data } = await backendApi.post("", {
      query: SIGN_UP,
      variables: {
        input,
      },
    })

    if (data.errors) throw data.errors[0].message
    return data.data.signup
  } catch (error) {
    throw error.toJSON().message
  }
}
