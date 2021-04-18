import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import TranslateScreen from "../screens/Translate.screen";
import UserScreen from "../screens/User.screen";
import Unit from "../screens/Unit.screen";
const Tab = createMaterialBottomTabNavigator();

const HomeNavigaion = (props) => {
  return (
    <Tab.Navigator
      labeled={false}
      initialRouteName="Vocabulary"
      activeColor="#3B82F6"
      barStyle={{
        backgroundColor: "#ffffff",
        borderTopColor: "#D1D5DB",
        borderTopWidth: 1,
      }}
    >
      <Tab.Screen
        name="Vocabulary"
        component={Unit}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="bookmark" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Translate"
        component={TranslateScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="g-translate" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeNavigaion;
