import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import translate from "translate-google-api";
import * as Speech from "expo-speech";

import tailwind from "tailwind-rn";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

const TranslateScreen = () => {
  const [text, setText] = React.useState("");
  const [value, onChangeText] = React.useState("I love you so much");
  const speak = () => {
    let str = value;
    const result = translate([str], {
      tld: "cn",
      to: "vi",
    });
    result.then((result) => {
      Speech.speak(str, {
        language: "en",
      });
      Speech.speak(result[0], {
        language: "vn",
      });
      setText(result[0]);
      console.log(result);
    });
  };

  return (
    <View style={tailwind("flex-1 bg-gray-100")}>
      <View
        style={tailwind(
          "flex flex-row justify-between py-5 px-5 bg-white border-b border-gray-100"
        )}
      >
        <View style={tailwind("")}>
          <Text style={tailwind("text-blue-500  text-lg")}>Tiếng anh</Text>
        </View>
        <View style={tailwind("")}>
          <TouchableOpacity
            onPress={() => {
              console.log("Swap");
            }}
          >
            <AntDesign
              name="swap"
              size={24}
              style={tailwind("text-blue-500")}
            />
          </TouchableOpacity>
        </View>
        <View style={tailwind("")}>
          <Text style={tailwind("text-blue-500  text-lg")}>Tiếng Việt</Text>
        </View>
      </View>
      <View style={tailwind("bg-white")}>
        <View style={tailwind("px-5 py-3 flex flex-row justify-between")}>
          <TouchableOpacity
            onPress={() => {
              speak();
              console.log("Loa loa");
            }}
          >
            <Feather
              name="volume-2"
              size={24}
              style={tailwind("text-gray-600")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("X");
            }}
          >
            <Feather
              name="x-circle"
              size={24}
              style={tailwind("text-gray-600")}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          value={value}
          multiline
          selectTextOnFocus
          placeholder="Nhập văn bản"
          numberOfLines={2}
          textAlignVertical="top"
          scrollEnabled
          style={tailwind("text-gray-900  px-5 py-2 py-2 h-10 text-lg")}
        ></TextInput>
      </View>
      <View style={tailwind("bg-blue-500 m-2 rounded-lg")}>
        <View
          style={tailwind("px-5 py-3 w-full flex flex-row justify-between")}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("Loa loa 2");
            }}
          >
            <Feather
              name="volume-2"
              size={24}
              style={tailwind("text-blue-100")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("PUSH");
            }}
          >
            <Feather
              name="plus-circle"
              size={24}
              style={tailwind("text-blue-100")}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={tailwind(" px-5 py-2 h-40 mt-1")}>
          <Text numberOfLines={100} style={tailwind("text-lg text-white")}>
            {text}
          </Text>
        </ScrollView>
        <View style={tailwind("px-5 py-3 w-full flex flex-row justify-end")}>
          <TouchableOpacity
            onPress={() => {
              console.log("Coppy");
            }}
          >
            <Feather name="copy" size={24} style={tailwind("text-blue-100")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default TranslateScreen;
