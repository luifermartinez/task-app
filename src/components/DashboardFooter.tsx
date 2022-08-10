import { Icon } from "@rneui/themed"
import { FC } from "react"
import { PixelRatio } from "react-native"
import { useDispatch } from "react-redux"
import { makeLogout } from "../api/auth"
import { logout } from "../redux/slices/userSlice"
import { errorToast } from "../utils/toasts"
import Button from "./ui/Button"
import Label from "./ui/Label"
import Wrapper from "./ui/Wrapper"

/* Defining the type of the props that the component will receive. */
interface Props {
  handleOpen: () => void
}

// DashboardFooter component that renders the footer of the dashboard task section.
// It has a button that allows the user to logout.
// It has a button that allows the user create a new Task.

const DashboardFooter: FC<Props> = ({ handleOpen }) => {
  const dispatch = useDispatch()

  // Function that logs the user out.
  const handleLogout = () => {
    makeLogout()
      .then(() => dispatch(logout()))
      .catch((err) => {
        errorToast(err)
        dispatch(logout())
      })
  }
  return (
    <Wrapper className="flex flex-1 flex-row items-center justify-between">
      <Button className="flex flex-row py-3" onPress={handleLogout}>
        <Icon
          name="keyboard-arrow-left"
          type="material"
          size={20}
          color="rgb(156,163,175)"
        />
        <Label className="text-gray-400 font-medium uppercase text-sm">
          Logout
        </Label>
      </Button>
      <Button
        className={`flex flex-row justify-center items-center bg-indigo-500 w-[${PixelRatio.getPixelSizeForLayoutSize(
          18
        )}px] h-[${PixelRatio.getPixelSizeForLayoutSize(
          18
        )}px] rounded-full shadow-md`}
        activeOpacity={0.8}
        onPress={handleOpen}
      >
        <Icon
          name="plus"
          type="font-awesome"
          color="white"
          size={PixelRatio.getPixelSizeForLayoutSize(10)}
        />
      </Button>
    </Wrapper>
  )
}

export default DashboardFooter
