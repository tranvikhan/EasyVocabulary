import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyUnit from "./MyUnit.screen";
import ClassUnit from "./ClassUnit.screen";
import TestUnit from "./TestUnit.screen";

const Tab = createMaterialTopTabNavigator();

const Unit = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MyUnit"
        options={{ title: "Của bạn" }}
        component={MyUnit}
      />
      <Tab.Screen
        name="ClassUnit"
        options={{ title: "Lớp học" }}
        component={ClassUnit}
      />
      <Tab.Screen
        name="Test"
        options={{ title: "Bài kiễm tra" }}
        component={TestUnit}
      />
    </Tab.Navigator>
  );
};

export default Unit;
