import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import * as Progress from "react-native-progress";
import VocabularyItem from "../components/VocabularyItem";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import KButton from "../components/ui-kit/KButton";

const dataSource = [
  {
    en: "Red",
    vi: "Màu đỏ",
    progress: 0,
  },
  {
    en: "White",
    vi: "Màu trắng",
    progress: 0.4,
  },
  {
    en: "Black",
    vi: "Màu đen",
    progress: 0.4,
  },
  {
    en: "Pink",
    vi: "Màu tím",
    progress: 0.6,
  },
  {
    en: "Yellow",
    vi: "Màu vàng",
    progress: 0.8,
  },
  {
    en: "Blue",
    vi: "Màu xanh",
    progress: 1,
  },
];
const UnitDetail = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const mapColor = (progress) => {
    if (progress === 0) return "#ffffff";
    if (progress < 0.25) return "#EF4444";
    if (progress < 0.5) return "#F59E0B";
    if (progress < 0.75) return "#6EE7B7";
    if (progress < 1) return "#34D399";
    return "#10B981";
  };
  return (
    <View style={tailwind("flex-1 flex-col bg-gray-200 ")}>
      <View style={tailwind("p-2 bg-white border-b border-gray-100")}>
        <View style={tailwind("flex-auto flex-row  px-2")}>
          <Text
            style={tailwind("font-bold  text-lg  text-gray-900")}
            multiline
            numberOfLines={1}
          >
            Màu sắc
          </Text>
        </View>
        <View style={tailwind("flex flex-row justify-between mb-2 px-2")}>
          <Text style={tailwind("text-gray-600")} multiline numberOfLines={1}>
            Đã học 2 từ
          </Text>
          <Text style={tailwind("text-gray-600")} multiline numberOfLines={1}>
            10 từ
          </Text>
        </View>
        <View style={tailwind("flex-auto px-2 justify-center")}>
          <Progress.Bar
            progress={0.2}
            width={null}
            height={10}
            borderRadius={10}
            color={mapColor(0.2)}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={tailwind("p-1 flex-col ")}
        data={dataSource}
        renderItem={({ item, index }) => (
          <VocabularyItem navigation={navigation} data={item} key={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        style={{
          ...tailwind(
            "rounded-full  absolute bottom-6 right-6 left-6 flex-row justify-between py-1"
          ),
        }}
      >
        <View style={tailwind("flex-grow mr-4")}>
          <KButton
            text="Bắt đầu học"
            color="blue-500"
            fill
            onPress={() => {
              navigation.navigate("StudyScreen");
            }}
            block
            icon={
              <Feather
                style={{
                  ...tailwind("text-white"),
                }}
                name="play"
                size={20}
              />
            }
          />
        </View>
        <View style={tailwind("")}>
          <KButton
            text="Thêm từ"
            color="blue-500"
            block
            onPress={() => {
              navigation.navigate("AddVocabulary");
            }}
            bgColor="blue-100"
            icon={
              <AntDesign
                style={{
                  ...tailwind("text-blue-500"),
                }}
                name="plus"
                size={20}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};
export default UnitDetail;
