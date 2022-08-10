import { StyleSheet, Platform, StatusBar } from "react-native"

/* Exporting the stylesheet to be used in other files. */
export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
