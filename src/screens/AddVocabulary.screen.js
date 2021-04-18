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
  FlatList,
  Button,
} from "react-native";

import translate from "translate-google-api";
import * as Speech from "expo-speech";

import tailwind from "tailwind-rn";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import KButton from "../components/ui-kit/KButton";

const AddVocabulary = () => {
  const [toText, setToText] = React.useState("");
  const [fromText, setFromText] = React.useState("");
  const [modeTranslate, setModeTranslate] = React.useState("en_vi");
  const typingTimeoutRef = React.useRef(null);
  const navigation = useNavigation();
  const goAdd = () => {
    navigation.navigate("AddToUnit");
  };
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={tailwind("mr-4")}
        >
          <AntDesign name="check" size={24} style={tailwind("text-blue-500")} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const [dataSource, setDataSource] = React.useState([]);

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
    setFromText(toText);
    setToText("");
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (toText.trim() != "") {
      let text = toText.trim();
      typingTimeoutRef.current = setTimeout(() => {
        start_translate(text, modeTranslate === "en_vi" ? "vi_en" : "en_vi");
      }, 100);
    } else {
      setToText("");
    }
  };

  const start_translate = (value, mode) => {
    translate([value], {
      from: mapLang[mode].from.code,
      to: mapLang[mode].to.code,
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
    let mode = modeTranslate;
    setFromText(value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (value.trim() != "") {
      let text = value.trim();
      typingTimeoutRef.current = setTimeout(() => {
        start_translate(text, mode);
      }, 500);
    } else {
      setToText("");
    }
  };
  return (
    <ScrollView style={tailwind("flex-1 bg-gray-200")}>
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
          <TouchableOpacity onPress={copyToClipboard}>
            <Feather name="copy" size={24} style={tailwind("text-blue-100")} />
          </TouchableOpacity>
        </View>
        <TextInput
          value={toText}
          onChangeText={(text) => setToText(text)}
          style={tailwind("text-lg text-white px-5 py-2 mt-1 h-14")}
          multiline
          selectTextOnFocus
          numberOfLines={2}
          textAlignVertical="top"
          scrollEnabled
        />
        <View
          style={tailwind("px-3 mb-3 mt-0 w-full flex flex-row justify-end")}
        >
          <TouchableOpacity
            onPress={() => {
              if (toText === "" || fromText == "") {
                ToastAndroid.show("Chưa thể thêm", ToastAndroid.SHORT);
                return;
              }

              let newList = [...dataSource];
              newList.unshift({
                en: modeTranslate === "en_vi" ? fromText : toText,
                vi: modeTranslate === "en_vi" ? toText : fromText,
              });
              setDataSource(newList);
            }}
            style={tailwind("bg-blue-400 p-2 rounded-full")}
          >
            <AntDesign
              style={{
                ...tailwind("text-blue-50"),
              }}
              name="plus"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tailwind("py-4 px-2")}>
        {dataSource.map((dt, i) => (
          <Item
            navigation={navigation}
            progress={Math.random()}
            key={i}
            enText={dt.en}
            viText={dt.vi}
            onDelete={(en) => {
              let newList = [...dataSource];
              newList = newList.filter((dt) => dt.en != en);
              setDataSource(newList);
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};
export default AddVocabulary;

const Item = (props) => {
  return (
    <TouchableOpacity
      style={tailwind("flex-1 my-1 bg-white rounded-lg")}
      activeOpacity={0.8}
      onPress={() => {
        Speech.speak(props.enText, { language: "en" });
        Speech.speak(props.viText, { language: "vi" });
      }}
    >
      <View style={tailwind("flex flex-row p-2 h-20")}>
        <View style={tailwind("flex-grow  justify-center p-2")}>
          <Text
            multiline
            numberOfLines={1}
            style={tailwind("text-lg mb-2 text-gray-900")}
          >
            {props.enText}
          </Text>
          <Text multiline numberOfLines={1} style={tailwind("text-gray-500")}>
            {props.viText}
          </Text>
        </View>
        <View style={tailwind("flex-grow items-end p-2")}>
          <TouchableOpacity
            style={tailwind("bg-red-100 p-1 rounded-full")}
            onPress={() => {
              props.onDelete(props.enText);
            }}
          >
            <Feather
              name="x-circle"
              size={24}
              style={tailwind("text-red-500")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
