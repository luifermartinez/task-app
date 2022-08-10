import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification"

/* 
  Functions to show toast and dialogs
*/
export const errorToast = (msg: string) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    textBody: msg,
  })
}

export const successToast = (msg: string) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    textBody: msg,
  })
}

export const successDialog = (msg: string) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    textBody: msg,
  })
}
