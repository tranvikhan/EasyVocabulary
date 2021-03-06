import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Alert,
  ToastAndroid,
} from "react-native";

import translate from "translate-google-api";
import * as Speech from "expo-speech";

import tailwind from "tailwind-rn";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const TranslateScreen = () => {
  const [toText, setToText] = React.useState("");
  const [fromText, setFromText] = React.useState("");
  const [modeTranslate, setModeTranslate] = React.useState("en_vi");
  const typingTimeoutRef = React.useRef(null);
  const navigation = useNavigation();
  const goAdd = () => {
    navigation.navigate("AddToUnit");
  };

  const mapLang = {
    en_vi: {
      from: {
        code: "en",
        name: "Tiếng anh",
      },
      to: {
        code: "vi",
        name: "Tiếng việt",
      },
    },
    vi_en: {
      to: {
        code: "en",
        name: "Tiếng anh",
      },
      from: {
        code: "vi",
        name: "Tiếng việt",
      },
    },
  };

  const togleModeTranslate = () => {
    setModeTranslate(modeTranslate === "en_vi" ? "vi_en" : "en_vi");
    let fText = fromText;
    setFromText(toText);
    setToText(fText);
  };

  const start_translate = (value) => {
    translate([value], {
      from: mapLang[modeTranslate].from.code,
      to: mapLang[modeTranslate].to.code,
    })
      .then((result) => {
        //console.log(result);
        setToText(result[0]);
      })
      .catch(function (error) {
        setToText("");
        console.log("Error Translate: " + error.message);
        Alert.alert(
          "Hết hạn dùng thử",
          "Chúng tôi cung cấp phiên bản miễn phí 100 từ dịch mỗi ngày",
          [
            {
              text: "Hủy",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Ok", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      });
  };

  const copyToClipboard = () => {
    ToastAndroid.show("Đã sao chép", ToastAndroid.SHORT);
    Clipboard.setString(toText);
  };
  const handleOnTextChange = (value) => {
    setFromText(value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (value.trim() != "") {
      let text = value.trim();
      typingTimeoutRef.current = setTimeout(() => {
        start_translate(text);
      }, 500);
    } else {
      setToText("");
    }
  };
  return (
    <View style={tailwind("flex-1 bg-gray-200")}>
      <View
        style={tailwind(
          "flex flex-row justify-between py-5 px-5 bg-white border-b border-gray-100"
        )}
      >
        <View style={tailwind("")}>
          <Text style={tailwind("text-blue-500  text-lg")}>
            {mapLang[modeTranslate].from.name}
          </Text>
        </View>
        <View style={tailwind("")}>
          <TouchableOpacity onPress={togleModeTranslate}>
            <AntDesign
              name="swap"
              size={24}
              style={tailwind("text-blue-500")}
            />
          </TouchableOpacity>
        </View>
        <View style={tailwind("")}>
          <Text style={tailwind("text-blue-500  text-lg")}>
            {mapLang[modeTranslate].to.name}
          </Text>
        </View>
      </View>
      <View style={tailwind("bg-white")}>
        <View style={tailwind("px-5 py-3 flex flex-row justify-between")}>
          <TouchableOpacity
            onPress={() => {
              Speech.speak(fromText, {
                language: mapLang[modeTranslate].from.code,
              });
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
              setFromText("");
              setToText("");
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
          onChangeText={handleOnTextChange}
          value={fromText}
          multiline
          selectTextOnFocus
          placeholder="Nhập văn bản"
          numberOfLines={2}
          textAlignVertical="top"
          scrollEnabled
          style={tailwind("text-gray-900  px-5 py-2 py-2 h-14 text-lg")}
        ></TextInput>
      </View>
      <View style={tailwind("bg-blue-500 m-2 rounded-lg")}>
        <View
          style={tailwind("px-5 py-3 w-full flex flex-row justify-between")}
        >
          <TouchableOpacity
            onPress={() => {
              Speech.speak(toText, {
                language: mapLang[modeTranslate].to.code,
              });
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
              goAdd();
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
            {toText}
          </Text>
        </ScrollView>
        <View style={tailwind("px-5 py-3 w-full flex flex-row justify-end")}>
          <TouchableOpacity onPress={copyToClipboard}>
            <Feather name="copy" size={24} style={tailwind("text-blue-100")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default TranslateScreen;
