import { useNavigation } from "@react-navigation/native"
import { Icon } from "@rneui/themed"
import { SafeAreaView, PixelRatio } from "react-native"
import Button from "../components/ui/Button"
import Label from "../components/ui/Label"
import Wrapper from "../components/ui/Wrapper"
import { AppNavigatorProp } from "../navigators/AppNavigator"
import globalStyles from "../styles/global.styles"
import React, { useEffect, useMemo, useRef } from "react"
import BottomSheetCustom from "../components/ui/BottomSheetCustom"
import BottomSheet from "@gorhom/bottom-sheet"

// Home is a View component that renders the Home screen.

const Home = () => {
  /* Creating a ref for the bottom sheet and setting the snap points. */
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(
    () => [PixelRatio.getPixelSizeForLayoutSize(110)],
    []
  )
  const { navigate } = useNavigation<AppNavigatorProp>()

  /* Expanding the bottom sheet on mount. */
  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand()
    }
  }, [bottomSheetRef.current])

  return (
    <SafeAreaView style={globalStyles.AndroidSafeArea}>
      <Wrapper className="h-full flex items-center justify-center">
        <Wrapper className="-mt-20 bg-indigo-500 h-1/3 absolute -top-4 right-0 w-1/2 rounded-bl-full"></Wrapper>
        <Wrapper className="-mt-20 bg-indigo-500 h-2/5 absolute -bottom-20 -left-0 w-1/2 rounded-tr-full"></Wrapper>
        <Wrapper className=" absolute top-3/9">
          <Icon
            name="check"
            type="font-awesome"
            size={PixelRatio.getPixelSizeForLayoutSize(30)}
            color="black"
          />
          <Label
            className={`text-[${PixelRatio.getPixelSizeForLayoutSize(
              16
            )}px] font-extrabold uppercase mt-4 tracking-widest`}
          >
            Task App
          </Label>
        </Wrapper>
        <BottomSheetCustom
          animateOnMount
          ref={bottomSheetRef as any}
          index={0}
          snapPoints={snapPoints}
          className="shadow-2xl mx-4 rounded-2xl"
        >
          <Wrapper className="min-h-full p-6">
            <Wrapper className="mt-5">
              <Label className="text-3xl font-bold">Welcome</Label>
              <Label className="font-bold text-sm mt-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
                eius architecto nihil facilis possimus!
              </Label>
              <Wrapper className="flex flex-row w-full justify-between items-stretch mt-10">
                <Button
                  className="bg-black rounded-full py-4 flex-1 mr-2 flex items-center"
                  activeOpacity={0.8}
                  onPress={() => navigate("Login")}
                >
                  <Label className="text-white font-bold">Sign In</Label>
                </Button>
                <Button
                  className="bg-indigo-500 rounded-full py-4 flex-1 flex items-center"
                  activeOpacity={0.8}
                  onPress={() => navigate("SignUp")}
                >
                  <Label className="font-bold text-white">Sign Up</Label>
                </Button>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </BottomSheetCustom>
      </Wrapper>
    </SafeAreaView>
  )
}

export default Home
