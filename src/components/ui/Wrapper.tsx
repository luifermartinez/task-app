import tw from "twrnc"
import { FC } from "react"
import { View, ViewProps } from "react-native"

interface Props extends ViewProps {
  className?: string
  children?: any
}

/* A React component that takes in a className prop and returns a View component with the className
prop as the style. */
const Wrapper: FC<Props> = ({ children, className }) => {
  return <View style={className ? tw`${className}` : {}}>{children}</View>
}

export default Wrapper
