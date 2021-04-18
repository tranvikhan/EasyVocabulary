import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import * as Progress from "react-native-progress";
const UnitItem = (props) => {
  const mapColor = (progress) => {
    if (progress === 0) return "#ffffff";
    if (progress < 0.25) return "#EF4444";
    if (progress < 0.5) return "#F59E0B";
    if (progress < 0.75) return "#6EE7B7";
    if (progress < 1) return "#34D399";
    return "#10B981";
  };
  return (
    <TouchableOpacity
      style={{ ...tailwind(`m-1 bg-white rounded-lg`), width: "47.8%" }}
      activeOpacity={0.5}
      onPress={() => {
        if (props.navigation) {
          props.navigation.navigate("UnitDetail", { id: props.index });
        }
      }}
    >
      <View style={tailwind("flex flex-col p-2 h-32")}>
        <View style={tailwind("flex-1 justify-center p-2")}>
          <Text
            style={tailwind("font-bold text-lg mb-2 text-gray-900")}
            multiline
            numberOfLines={1}
          >
            {props.data.name}
          </Text>
          <Text style={tailwind("text-gray-600")} multiline numberOfLines={1}>
            {props.data.count + " từ"}
          </Text>
        </View>
        <View style={tailwind("flex-1 p-2 justify-center")}>
          <Progress.Bar
            progress={props.data.progress}
            width={null}
            height={10}
            borderRadius={10}
            color={mapColor(props.data.progress)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default UnitItem;
