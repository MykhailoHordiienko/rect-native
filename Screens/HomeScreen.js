import React from "react";
import { CreatePostsScreen, PostsScreen, ProfileScreen } from "./MainScreen";
import {
  PostsSvg,
  CreatePostsSvg,
  ProfileSvg,
  LogOutSvg,
  ArrowLeftSvg,
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
        sceneContainerStyle={{ backgroundColor: "#ffffff" }}
        screenOptions={{
          tabBarShowLabel: false,
        }}>
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            headerRightContainerStyle: { paddingRight: 16 },
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
          options={({ navigation }) => ({
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Posts");
                  }}>
                  <ArrowLeftSvg />
                </TouchableOpacity>
              );
            },
            headerLeftContainerStyle: { paddingLeft: 16 },
            tabBarIcon: (focused, color, size) => (
              <CreatePostsSvg
                size={size}
                focused={focused}
                fill={color}
              />
            ),
          })}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerRightContainerStyle: { paddingRight: 16 },
            headerRight: () => (
              <TouchableOpacity onPress={handleLogOut}>
                <LogOutSvg />
              </TouchableOpacity>
            ),
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
