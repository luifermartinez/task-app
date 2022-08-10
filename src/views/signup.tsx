import { SafeAreaView } from "react-native"
import Wrapper from "../components/ui/Wrapper"
import globalStyles from "../styles/global.styles"
import AuthHeader from "../components/AuthHeader"
import SignUpForm from "../components/signup/SignUpForm"

/**
 * SignUp is a function that returns a SafeAreaView component that contains a Wrapper component that
 * contains an AuthHeader component and a SignUpForm component.
 * @returns A function that returns a component.
 */
const SignUp = () => {
  return (
    <SafeAreaView style={globalStyles.AndroidSafeArea}>
      <Wrapper className="h-full flex bg-indigo-600">
        <AuthHeader
          title="Sign Up"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ipsa
  adipisci."
        />
        <SignUpForm />
      </Wrapper>
    </SafeAreaView>
  )
}

export default SignUp
