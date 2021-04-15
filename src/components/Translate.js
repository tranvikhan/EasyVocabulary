import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";
import translate from "translate-google-api";
import * as Speech from "expo-speech";
import tailwind from "tailwind-rn";

export default function App() {
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
    <SafeAreaView style={tailwind("h-full")}>
      <View style={tailwind("pt-12 items-center")}>
        <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
          <Text style={tailwind("text-blue-800 font-semibold")}>
            Hello Tailwind
          </Text>
          <TextInput
            onChangeText={(text) => onChangeText(text)}
            editable
            value={value}
            maxLength={40}
            multiline
            numberOfLines={4}
          />
          <Text>{text}</Text>
          <Button
            title="Dịch"
            onPress={speak}
            style={tailwind(
              "bg-blue-500 text-white font-bold py-2 px-4 rounded"
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
