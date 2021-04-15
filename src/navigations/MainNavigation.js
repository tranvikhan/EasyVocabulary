import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { SafeAreaView, View, Text, Platform } from "react-native";
import tailwind from "tailwind-rn";
import Feather from "react-native-vector-icons/Feather";
import TranslateScreen from "../screens/Translate.screen";

const Tab = createMaterialBottomTabNavigator();
const VocabularyScreen = () => (
  <View style={tailwind("pt-12 items-center")}>
    <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
      <Text style={tailwind("text-blue-800 font-semibold")}>
        Hello Tailwind 1
      </Text>
    </View>
  </View>
);

const SettingsScreen = () => (
  <View style={tailwind("pt-12 items-center")}>
    <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
      <Text style={tailwind("text-blue-800 font-semibold")}>
        Hello Tailwind 3
      </Text>
    </View>
  </View>
);

export default function MainMenu() {
  return (
    <SafeAreaView
      style={{
        ...tailwind("h-full"),
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <Tab.Navigator labeled={false} initialRouteName="Vocabulary">
        <Tab.Screen
          name="Vocabulary"
          component={VocabularyScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="bookmark" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Translate"
          component={TranslateScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="framer" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="settings" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
