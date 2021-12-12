import React from "react";
import { SafeAreaView, View, Text, Platform } from "react-native";
import tailwind from "tailwind-rn";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigaion from "./HomeNavigation";
import AddVocabulary from "../screens/AddVocabulary.screen";
import UnitDetail from "../screens/UnitDetail.screen";
import AddToUnit from "../screens/AddToUnit.screen";
import TestScreen from "../screens/Test.screen";
import StudyScreen from "../screens/Study.screen";
import AuthNavigation from "./AuthNavigation";
import { useAuth } from "../Firebase/context";
import SettingScreen from "../screens/Setting.screen";
import AuthorScreen from "../screens/Author.screen";

const Stack = createStackNavigator();

export default function MainMenu() {
  const { currentUser } = useAuth();

  return currentUser ? (
    <SafeAreaView
      style={{
        ...tailwind("h-full"),
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="UnitDetail"
          component={UnitDetail}
          options={{ title: "Danh sách từ vựng" }}
        />
        <Stack.Screen
          name="AddVocabulary"
          component={AddVocabulary}
          options={{ title: "Thêm từ vựng" }}
        />
        <Stack.Screen
          name="StudyScreen"
          component={StudyScreen}
          options={{ title: "Luyện tập" }}
        />
        <Stack.Screen
          name="TestScreen"
          component={TestScreen}
          options={{ title: "Kiễm tra" }}
        />
        <Stack.Screen
          name="AddToUnit"
          component={AddToUnit}
          options={{ title: "Chọn bài học của bạn" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigaion}
          options={{ title: "Easy Vocabulary", headerShown: false }}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{ title: "Cài đặt" }}
        />
        <Stack.Screen
          name="AuthorScreen"
          component={AuthorScreen}
          options={{ title: "Thông tin tác giả" }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  ) : (
    <AuthNavigation />
  );
}
