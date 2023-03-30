import React from "react";
import { CreatePostsScreen, PostsScreen, ProfileScreen } from "./MainScreen";
import {
  PostsSvg,
  CreatePostsSvg,
  ProfileSvg,
  ArrowLeftSvg,
} from "../Utils/SvgComponents";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const MainTab = createBottomTabNavigator();

export const HomeScreen = () => {
  const user = useSelector((state) => state.auth.nickName);

  return (
    <>
      <MainTab.Navigator
        sceneContainerStyle={{ backgroundColor: "#ffffff" }}
        screenOptions={{
          tabBarShowLabel: false,
        }}>
        <MainTab.Screen
          name="Posts"
          children={() => <PostsScreen />}
          options={{
            headerShown: false,
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
            headerRightContainerStyle: { paddingRight: 16 },

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
