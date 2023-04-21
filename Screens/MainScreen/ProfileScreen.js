import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultProfileScreen } from "../NestedPostsScreen";
import { CommentsScreen } from "../NestedPostsScreen";
import { MapScreen } from "../NestedPostsScreen";
import { TouchableOpacity } from "react-native";
import { ArrowLeftSvg, LogOutSvg } from "../../Utils/SvgComponents";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../Redux/Auth/authOperations";

const NestedScreen = createStackNavigator();

export const ProfileScreen = () => {
  return (
    <NestedScreen.Navigator screenOptions={{}}>
      <NestedScreen.Screen
        name="DefaultProfileScreen"
        component={DefaultProfileScreen}
        options={{
          headerShown: false,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DefaultProfileScreen");
                }}>
                <ArrowLeftSvg />
              </TouchableOpacity>
            );
          },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRightContainerStyle: { paddingRight: 16 },
        })}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DefaultProfileScreen");
                }}>
                <ArrowLeftSvg />
              </TouchableOpacity>
            );
          },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRightContainerStyle: { paddingRight: 16 },
        })}
      />
    </NestedScreen.Navigator>
  );
};
