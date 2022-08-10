import { useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { PixelRatio, ScrollView, TextInput } from "react-native"
import { makeSignUp } from "../../api/auth"
import { ISignInput } from "../../utils/interfaces"
import BottomSheetCustom from "../ui/BottomSheetCustom"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Label from "../ui/Label"
import Wrapper from "../ui/Wrapper"
import BottomSheet from "@gorhom/bottom-sheet"
import { errorToast, successDialog } from "../../utils/toasts"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorProp } from "../../navigators/AppNavigator"

// SignUpForm is a component that renders the login form.
// It has a form that allows the user to signup.

const SignUpForm = () => {
  const { push, pop } = useNavigation<AppNavigatorProp>()
  const nameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(
    () => [PixelRatio.getPixelSizeForLayoutSize(185)],
    []
  )
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignInput>({ mode: "onChange" })

  const handleSignUp = (input: ISignInput) => {
    setLoading(true)
    makeSignUp({
      email: input.email,
      password: input.password,
      name: input.name,
    })
      .then((res) => {
        successDialog("You have successfully signed up, please login")
        pop(1)
        push("Login")
      })
      .catch((error) => errorToast(error))
      .finally(() => setLoading(false))
  }

  return (
    <BottomSheetCustom
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      className="shadow-2xl mx-3"
    >
      <Wrapper className="flex p-5 pt-8">
        <ScrollView>
          <Input
            className="mt-5 rounded-full py-4 px-10 bg-gray-100 font-medium"
            placeholder="Full Name"
            name="name"
            control={control}
            returnKeyType="next"
            rules={{
              required: "Name is required",
            }}
            errors={errors}
            ref={nameRef}
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <Input
            className="mt-5 rounded-full py-4 px-10 bg-gray-100 font-medium"
            placeholder="Email"
            textContentType="emailAddress"
            name="email"
            control={control}
            returnKeyType="next"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            errors={errors}
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            className="mt-5 rounded-full py-4 px-10 bg-gray-100 font-medium"
            placeholder="Password"
            textContentType="password"
            control={control}
            name="password"
            returnKeyType="next"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            errors={errors}
            secureTextEntry={true}
            ref={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
          <Input
            className="mt-5 rounded-full py-4 px-10 bg-gray-100 font-medium"
            placeholder="Confirm password"
            textContentType="password"
            control={control}
            name="confirmPassword"
            returnKeyType="done"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) => {
                return value === watch("password") || "Passwords do not match"
              },
            }}
            errors={errors}
            secureTextEntry={true}
            ref={passwordRef}
            onSubmitEditing={handleSubmit(handleSignUp)}
          />
          <Button
            className="mt-5 bg-black rounded-full py-5 mr-2 flex items-center flex-row justify-center"
            activeOpacity={0.8}
            onPress={handleSubmit(handleSignUp)}
            loading={loading}
          >
            <Label className="text-white font-bold">Sign Up</Label>
          </Button>
        </ScrollView>
      </Wrapper>
    </BottomSheetCustom>
  )
}

export default SignUpForm
