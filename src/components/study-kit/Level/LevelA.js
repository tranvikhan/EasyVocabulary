import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tailwind from "tailwind-rn";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";

import * as Speech from "expo-speech";
import KButton from "../../ui-kit/KButton";
const LevelA = (props) => {
  const [status, setStatus] = React.useState("wait");

  const [sound, setSound] = React.useState();
  React.useEffect(() => {
    setStatus("wait");
  }, [props.data]);

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
  const beforeSubmit = (value, userChoose) => {
    if (value) {
      setStatus("true");
      playSound(true);
    } else {
      setStatus("false");
      playSound(false);
    }
    setTimeout(() => {
      props.submit({
        isTrue: value,
        userQestion: userChoose === "false" ? "Sai" : "Đúng",
      });
    }, 500);
  };
  const onSubmit = (value) => {
    if (props.data.isTrue) {
      if (value === "false") {
        beforeSubmit(false, value);
        return;
      }

      beforeSubmit(true, value);
      return;
    } else {
      if (value === "false") {
        beforeSubmit(true, value);
        return;
      }
      beforeSubmit(false, value);
      return;
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
            Kiễm tra nghĩa
          </Text>
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
          {props.data.isTrue
            ? props.data.vi
            : props.data.noise[RamdomNum(0, 3)].vi}
        </Text>
      </View>

      <View style={tailwind("mt-4 flex-row")}>
        <View style={tailwind("flex-1 mr-4")}>
          <KButton
            text="Sai"
            onPress={() => onSubmit("false")}
            color="red-500"
            fill
            block
          />
        </View>
        <View style={tailwind("flex-1")}>
          <KButton
            text="Đúng"
            onPress={() => onSubmit("true")}
            color="blue-500"
            fill
            block
          />
        </View>
      </View>
    </View>
  );
};
export default LevelA;
