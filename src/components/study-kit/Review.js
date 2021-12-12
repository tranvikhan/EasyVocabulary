import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tailwind from "tailwind-rn";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import KButton from "../ui-kit/KButton";
import * as Speech from "expo-speech";
const Review = (props) => {
  return (
    <View
      style={tailwind(
        "flex-1 flex-col bg-white py-5 items-center flex-col bg-gray-100 px-5"
      )}
    >
      <View style={tailwind("w-full p-4 bg-white rounded-xl ")}>
        <View
          style={tailwind(
            "px-2 pb-2 border-b border-gray-200 flex-row justify-between items-center"
          )}
        >
          <Text style={tailwind("font-bold text-xl text-gray-800")}>
            Học từ mới
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Speech.speak(props.data.en, { language: "en" });
              Speech.speak(props.data.vi, { language: "vi" });
            }}
            style={tailwind("bg-gray-200 rounded-full p-2 ")}
          >
            <Feather
              name="volume-2"
              size={18}
              style={tailwind("text-gray-600")}
            />
          </TouchableOpacity>
        </View>

        <Text
          multiline
          numberOfLines={2}
          style={tailwind("text-lg px-2 mb-2 text-gray-800 mt-4")}
        >
          {props.data.en}
        </Text>
        <Text
          multiline
          numberOfLines={2}
          style={tailwind("px-2 mb-2 text-gray-500 mt-4")}
        >
          {props.data.vi}
        </Text>
      </View>

      <View style={tailwind("items-center mt-4")}>
        <KButton
          text="Tiếp tục"
          color="blue-500"
          fill
          block
          onPress={props.submit}
        />
      </View>
    </View>
  );
};
export default Review;
