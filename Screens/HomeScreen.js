import React from "react";
import { CreatePostsScreen, PostsScreen, ProfileScreen } from "./MainScreen";
import {
  PostsSvg,
  CreatePostsSvg,
  ProfileSvg,
  LogOutSvg,
} from "../Utils/SvgComponents";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainTab = createBottomTabNavigator();

export const HomeScreen = ({ setIsAuth }) => {
  const handleLogOut = () => {
    setIsAuth(false);
  };
  return (
    <>
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
        }}>
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            headerRightContainerStyle: { paddingRight: 10 },
            headerRight: () => (
              <TouchableOpacity onPress={handleLogOut}>
                <LogOutSvg />
              </TouchableOpacity>
            ),
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
    </>
  );
};
