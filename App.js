import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import translate from "translate-google-api";
import * as Speech from "expo-speech";

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
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: value,
          borderColor: "#000000",
          borderWidth: 1,
          padding: 2,
          width: 300,
        }}
      >
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          editable
          value={value}
          maxLength={40}
          multiline
          numberOfLines={4}
        />
      </View>

      <Text>{text}</Text>
      <Button title="Dịch" onPress={speak} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
