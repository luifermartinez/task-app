import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./src/navigators/AppNavigator"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./src/redux/store"
import "react-native-reanimated"
import { Text } from "react-native"
import { Root } from "react-native-alert-notification"

export default function App() {
  return (
    <SafeAreaProvider>
      <Root toastConfig={{ autoClose: 3000 }}>
        <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </Root>
    </SafeAreaProvider>
  )
}
