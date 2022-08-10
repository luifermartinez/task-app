import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

/* A functions that scales the size of the screen. */

const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

export const scale = (size: number) => (width / guidelineBaseWidth) * size
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size
