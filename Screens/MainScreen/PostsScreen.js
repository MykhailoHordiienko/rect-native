import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultPostsScreen } from "../NestedPostsScreen";
import { CommentsScreen } from "../NestedPostsScreen";
import { MapScreen } from "../NestedPostsScreen";
import { TouchableOpacity } from "react-native";
import { ArrowLeftSvg, LogOutSvg } from "../../Utils/SvgComponents";

const NestedScreen = createStackNavigator();

export const PostsScreen = ({ setIsAuth }) => {
  const handleLogOut = () => {
    setIsAuth(false);
  };

  return (
    <NestedScreen.Navigator screenOptions={{}}>
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{
          title: "Posts",
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },

          headerRight: () => (
            <TouchableOpacity onPress={handleLogOut}>
              <LogOutSvg />
            </TouchableOpacity>
          ),
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
                  navigation.navigate("DefaultPostsScreen");
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
                  navigation.navigate("DefaultPostsScreen");
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
