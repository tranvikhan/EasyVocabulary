import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tailwind from "tailwind-rn";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";

import * as Speech from "expo-speech";
import KButton from "../../ui-kit/KButton";
import KTextInput from "../../ui-kit/KTextInput";
const LevelH = (props) => {
  const [status, setStatus] = React.useState("wait");
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    setText("");
    setStatus("wait");
  }, [props.data]);

  const [sound, setSound] = React.useState();

  async function playSound(value) {
    const { sound } = await Audio.Sound.createAsync(
      value
        ? require("../../../assets/sound/DeviceConnect.wav")
        : require("../../../assets/sound/DeviceFailed.wav")
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const RamdomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const mapcolor = {
    wait: "white",
    true: "green-500",
    false: "red-500",
  };

  const onSubmit = (text) => {
    if (props.data.en.trim().toLowerCase() === text.trim().toLowerCase()) {
      setStatus("true");
      playSound(true);
      setTimeout(() => {
        props.submit({
          isTrue: true,
          userQestion: text,
        });
      }, 500);
    } else {
      setStatus("false");
      playSound(false);
      setTimeout(() => {
        props.submit({
          isTrue: false,
          userQestion: text,
        });
      }, 500);
    }
  };
  return (
    <View
      style={tailwind(
        "flex-1 flex-col bg-white py-5 items-center flex-col bg-gray-100 px-5 "
      )}
    >
      <View
        style={tailwind(
          `w-full p-4 bg-white rounded-xl border-4 border-${mapcolor[status]}`
        )}
      >
        <View
          style={tailwind(
            "px-2 pb-2 border-b border-gray-200 flex-row justify-between items-center"
          )}
        >
          <Text style={tailwind("font-bold text-xl text-gray-800")}>
            Viết từ tiếng anh
          </Text>
        </View>

        <Text
          multiline
          numberOfLines={2}
          style={tailwind("text-lg px-2 mb-2 text-gray-800 mt-4")}
        >
          {props.data.vi}
        </Text>
        <KTextInput
          placeholder="Nhập ở đây"
          value={text}
          onChangeText={(vl) => setText(vl)}
        />
      </View>

      <View style={tailwind("mt-4 flex-row")}>
        <View style={tailwind("flex-1")}>
          <KButton
            text="Kiễm tra"
            onPress={() => onSubmit(text)}
            color="blue-500"
            fill
            block
          />
        </View>
      </View>
    </View>
  );
};
export default LevelH;
