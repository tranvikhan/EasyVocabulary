import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import ProgressCircle from "react-native-progress-circle";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Speech from "expo-speech";
const VocabularyItem = (props) => {
  const mapColor = (progress) => {
    if (progress === 0) return "#ffffff";
    if (progress < 0.25) return "#EF4444";
    if (progress < 0.5) return "#F59E0B";
    if (progress < 0.75) return "#6EE7B7";
    if (progress < 1) return "#34D399";
    return "#10B981";
  };
  const mapColor100 = (progress) => {
    if (progress === 0) return "#ffffff";
    if (progress < 0.25) return "#FEE2E2";
    if (progress < 0.5) return "#FEF3C7";
    if (progress < 0.75) return "#D1FAE5";
    if (progress < 1) return "#A7F3D0";
    return "#6EE7B7";
  };
  return (
    <TouchableOpacity
      style={tailwind("m-1 bg-white rounded-lg")}
      activeOpacity={0.8}
      onPress={() => {
        Speech.speak(props.data.en, { language: "en" });
        Speech.speak(props.data.vi, { language: "vi" });
      }}
    >
      <View style={tailwind("flex flex-row p-2 h-20")}>
        <View style={tailwind("flex-1  justify-center p-2")}>
          <Text
            style={tailwind("text-lg mb-2 text-gray-900")}
            multiline
            numberOfLines={1}
          >
            {props.data.en}
          </Text>
          <Text style={tailwind("text-gray-500")} multiline numberOfLines={1}>
            {props.data.vi}
          </Text>
        </View>
        <View style={tailwind("p-2 justify-center items-end")}>
          <ProgressCircle
            percent={props.data.progress * 100}
            radius={24}
            borderWidth={5}
            color={mapColor(props.data.progress)}
            shadowColor={mapColor100(props.data.progress)}
            bgColor="#fff"
          >
            {props.data.progress > 0 && props.data.progress < 1 && (
              <Text style={{ fontSize: 10 }}>
                {Math.round(props.data.progress * 10000) / 100 + "%"}
              </Text>
            )}
            {props.data.progress === 1 && (
              <FontAwesome5
                size={22}
                name="check"
                color={mapColor(props.data.progress)}
              />
            )}
          </ProgressCircle>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default VocabularyItem;
