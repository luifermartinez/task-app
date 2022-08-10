import { FC } from "react"
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import tw from "twrnc"
import Wrapper from "./Wrapper"

/* Defining the props that the Button component will accept. */
interface ButtonProps extends TouchableOpacityProps {
  children?: any
  className?: string
  onPress?: () => void
  loading?: boolean
  loadingColor?: string
}

/**
 * Button is a React component that renders a TouchableOpacity component with a child ActivityIndicator
 * component if the loading prop is true
 * @param  - children - the text inside the button
 */
const Button: FC<ButtonProps> = ({
  children,
  className,
  onPress,
  loading,
  loadingColor,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={className ? tw`${className}` : {}}
      onPress={onPress}
      {...rest}
    >
      {loading && (
        <Wrapper className="mr-2">
          <ActivityIndicator size="small" color={loadingColor || "white"} />
        </Wrapper>
      )}
      {children}
    </TouchableOpacity>
  )
}

export default Button
