import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tailwind from "tailwind-rn";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";

import * as Speech from "expo-speech";

import KBtnVoca from "../../ui-kit/KBtnVoca";
const LevelD = (props) => {
  const [status, setStatus] = React.useState(["wait", "wait", "wait", "wait"]);
  const [list, setList] = React.useState([]);
  const [correctIndex, setCorrectIndex] = React.useState(3);
  React.useEffect(() => {
    if (props.data) {
      let coppy = [...props.data.noise];
      coppy.push({
        en: props.data.en,
        vi: props.data.vi,
      });
      coppy = shuffle(coppy);
      coppy.forEach((value, index) => {
        if (value.en === props.data.en) {
          setCorrectIndex(index);
          console.log(index);
        }
      });
      setList(coppy);
      console.log(coppy);
      //Speech.speak(props.data.en, { language: "en" });
    }
  }, [props.data]);
  const [sound, setSound] = React.useState();
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

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
    wait: ["blue-600", "blue-100"],
    true: ["green-500", "green-100"],
    false: ["red-500", "red-100"],
  };

  const onSubmit = (index) => {
    let newStatus = [...status];
    if (index === correctIndex) {
      newStatus[correctIndex] = "true";

      setStatus(newStatus);
      playSound(true);
      setTimeout(() => {
        props.submit({
          isTrue: true,
          userQestion: list[index].vi,
        });
      }, 500);
    } else {
      newStatus[correctIndex] = "true";
      newStatus[index] = "false";
      setStatus(newStatus);
      playSound(false);
      setTimeout(() => {
        props.submit({
          isTrue: false,
          userQestion: list[index].vi,
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
        style={tailwind(`w-full p-4 bg-white rounded-xl border-4 border-white`)}
      >
        <View
          style={tailwind(
            "px-2 pb-2 border-b border-gray-200 flex-row justify-between items-center"
          )}
        >
          <Text style={tailwind("font-bold text-xl text-gray-800")}>
            Nghe và chọn từ đúng
          </Text>
        </View>
        <View style={tailwind("mb-0 mt-4 items-center")}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Speech.speak(props.data.en, { language: "en" });
            }}
            style={tailwind("bg-gray-200 rounded-full p-4 ")}
          >
            <Feather
              name="volume-2"
              size={30}
              style={tailwind("text-gray-600")}
            />
          </TouchableOpacity>
        </View>
      </View>
      {list.length > 0 && (
        <>
          <View style={tailwind("mt-4 flex-row")}>
            <View style={tailwind("flex-1 mr-4")}>
              <KBtnVoca
                bgColor={mapcolor[status[0]][1]}
                text={list[0].vi}
                onPress={() => onSubmit(0)}
                color={mapcolor[status[0]][0]}
                block
              />
            </View>
            <View style={tailwind("flex-1")}>
              <KBtnVoca
                bgColor={mapcolor[status[1]][1]}
                text={list[1].vi}
                onPress={() => onSubmit(1)}
                color={mapcolor[status[1]][0]}
                block
              />
            </View>
          </View>
          <View style={tailwind("mt-4 flex-row")}>
            <View style={tailwind("flex-1 mr-4")}>
              <KBtnVoca
                bgColor={mapcolor[status[2]][1]}
                text={list[2].vi}
                onPress={() => onSubmit(2)}
                color={mapcolor[status[2]][0]}
                block
              />
            </View>
            <View style={tailwind("flex-1")}>
              <KBtnVoca
                bgColor={mapcolor[status[3]][1]}
                text={list[3].vi}
                onPress={() => onSubmit(3)}
                color={mapcolor[status[3]][0]}
                block
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};
export default LevelD;
