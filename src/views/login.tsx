import { SafeAreaView } from "react-native"
import Wrapper from "../components/ui/Wrapper"
import globalStyles from "../styles/global.styles"
import LoginForm from "../components/login/LoginForm"
import AuthHeader from "../components/AuthHeader"

/**
 * Login is a function that returns a SafeAreaView component that contains a Wrapper component that
 * contains an AuthHeader component and a LoginForm component.
 * @returns A function that returns a component.
 */
const Login = () => {
  return (
    <SafeAreaView style={globalStyles.AndroidSafeArea}>
      <Wrapper className="h-full flex bg-indigo-600">
        <AuthHeader
          title="Sign In"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ipsa
  adipisci."
        />
        <LoginForm />
      </Wrapper>
    </SafeAreaView>
  )
}

export default Login
