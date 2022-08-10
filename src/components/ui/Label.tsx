import { FC } from "react"
import { Text } from "react-native"
import tw from "twrnc"

interface LabelPropsProps {
  children: any
  className?: string
}

/* A React component that takes in a className and children props. and return a Text component with styles using tailwind */
const Label: FC<LabelPropsProps> = ({ className, children }) => {
  return <Text style={className ? tw`${className}` : {}}>{children}</Text>
}

export default Label
