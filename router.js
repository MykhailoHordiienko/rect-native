import LoginScreen from "./Screens/Auth/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import {
  CreatePostsScreen,
  PostsScreen,
  ProfileScreen,
} from "./Screens/MainScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  PostsSvg,
  CreatePostsSvg,
  ProfileSvg,
  LogOutSvg,
} from "./Utils/SvgComponents";
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const handleRouting = (param) => {
  if (!param) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRightContainerStyle: { paddingRight: 10 },
          headerRight: () => <LogOutSvg />,
          tabBarIcon: (focused, color, size) => (
            <PostsSvg
              size={size}
              focused={focused}
              fill={color}
            />
          ),
        }}
      />

      <MainTab.Screen
        name="Create Post"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: (focused, color, size) => (
            <CreatePostsSvg
              size={size}
              focused={focused}
              fill={color}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (focused, color, size) => (
            <ProfileSvg
              size={size}
              focused={focused}
              fill={color}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
