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

const Stack = createStackNavigator();

export default function MainMenu() {
  return (
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
      </Stack.Navigator>
    </SafeAreaView>
  );
}
