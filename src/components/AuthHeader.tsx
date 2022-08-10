import { useNavigation } from "@react-navigation/native"
import { Icon } from "@rneui/themed"
import { FC } from "react"
import { AppNavigatorProp } from "../navigators/AppNavigator"
import Button from "./ui/Button"
import Label from "./ui/Label"
import Wrapper from "./ui/Wrapper"

/* Defining the props that the component will receive. */
interface Props {
  title: string
  description: string
}

// AuthHeader component that renders the header of the auth views.

const AuthHeader: FC<Props> = ({ title, description }) => {
  const { goBack } = useNavigation<AppNavigatorProp>()
  return (
    <Wrapper className="h-1/4 flex">
      <Button className="p-3 self-start " onPress={goBack}>
        <Icon name="arrow-left" type="font-awesome-5" size={20} color="white" />
      </Button>
      <Wrapper className="p-5">
        <Label className="text-4xl font-extrabold mb-3 text-white">
          {title}
        </Label>
        <Label className="font-bold text-white">{description}</Label>
      </Wrapper>
    </Wrapper>
  )
}

export default AuthHeader
