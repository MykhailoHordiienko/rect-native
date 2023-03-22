import LoginScreen from "./Auth/LoginScreen";
import RegistrationScreen from "./Auth/RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

export const AuthScreen = ({ setIsAuth }) => {
  return (
    <>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login">
          {(props) => (
            <LoginScreen
              {...props}
              setIsAuth={setIsAuth}
            />
          )}
        </AuthStack.Screen>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration">
          {(props) => (
            <RegistrationScreen
              {...props}
              setIsAuth={setIsAuth}
            />
          )}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    </>
  );
};
