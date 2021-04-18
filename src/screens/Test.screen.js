import React from "react";
import { View, Text } from "react-native";
import tailwind from "tailwind-rn";

const TestScreen = (props) => (
  <View style={tailwind("pt-12 items-center")}>
    <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
      <Text style={tailwind("text-blue-800 font-semibold")}>TestScreen</Text>
    </View>
  </View>
);
export default TestScreen;
