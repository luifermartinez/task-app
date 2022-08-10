import { useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { PixelRatio, TextInput } from "react-native"
import { useDispatch } from "react-redux"
import { makeLogin } from "../../api/auth"
import { ILoginInput } from "../../utils/interfaces"
import BottomSheetCustom from "../ui/BottomSheetCustom"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Label from "../ui/Label"
import Wrapper from "../ui/Wrapper"
import BottomSheet from "@gorhom/bottom-sheet"
import { login } from "../../redux/slices/userSlice"
import { successToast } from "../../utils/toasts"

// LoginForm is a component that renders the login form.
// It has a form that allows the user to login.

const LoginForm = () => {
  const dispatch = useDispatch()
  /* A way to access the inputs elements. */
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  /* Creating a ref for the bottom sheet and setting the snap points. */
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(
    () => [PixelRatio.getPixelSizeForLayoutSize(170)],
    []
  )
  /* A state that is used to show a loading indicator when the user is logging in. */
  const [loading, setLoading] = useState(false)

  // The useForm hook is used to handle the form.
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({ mode: "onChange" })

  /**
   * When the user press the login button, we set the loading state to true, then we make a login
   * request with the email and password, then we dispatch the login action, then we show a success
   * toast, then we set the loading state to false.
   * @param  - email, password -&gt; the values of the inputs
   */

  function handleLogin({ email, password }) {
    setLoading(true)
    makeLogin({
      email,
      password,
    })
      .then((res) => dispatch(login(res)))
      .catch((err) => successToast(err))
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
          onSubmitEditing={handleSubmit(handleLogin)}
        />
        <Button
          className="mt-5 bg-black rounded-full py-5 mr-2 flex items-center flex-row justify-center"
          activeOpacity={0.8}
          onPress={handleSubmit(handleLogin)}
          loading={loading}
        >
          <Label className="text-white font-bold">Sign In</Label>
        </Button>
      </Wrapper>
    </BottomSheetCustom>
  )
}

export default LoginForm
