import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import { useSelector } from "react-redux"
import { selectUserState } from "../redux/slices/userSlice"
import Dashboard from "../views/dashboard"
import Home from "../views/home"
import Login from "../views/login"
import SignUp from "../views/signup"

// Views of the app
export type AppStackNavigatorParamList = {
  Home: undefined
  Login: undefined
  Dashboard: undefined
  SignUp: undefined
}

export type AppNavigatorProp =
  NativeStackNavigationProp<AppStackNavigatorParamList>

/* Creating a stack navigator with the type of AppStackNavigatorParamList. */
const Stack = createNativeStackNavigator<AppStackNavigatorParamList>()

const AppNavigator = () => {
  /* Destructuring the loggedIn property from the user state from redux. */
  const { loggedIn } = useSelector(selectUserState)

  return (
    <Stack.Navigator initialRouteName={loggedIn ? "Dashboard" : "Home"}>
      {loggedIn ? (
        <Stack.Screen
          name="Dashboard"
          options={{ headerShown: false }}
          component={Dashboard}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUp}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator
