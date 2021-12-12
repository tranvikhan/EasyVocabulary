import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import * as Progress from "react-native-progress";
import VocabularyItem from "../components/VocabularyItem";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import KButton from "../components/ui-kit/KButton";
import firebase from "firebase";

const UnitDetail = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [unit, setUnit] = React.useState(null);
  const [vocabularys, setVocabularys] = React.useState([]);
  React.useEffect(() => {
    if ((route.params.unit_id, route.params.userId)) {
      firebase
        .database()
        .ref("units/" + route.params.userId + "/" + route.params.unit_id)
        .on("value", (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUnit({
              ...data,
              progress: data.all === 0 ? 0 : data.count / data.all,
            });
          } else {
            setUnit(null);
            navigation.goBack();
          }
        });
      firebase
        .database()
        .ref("vocabularys/" + route.params.unit_id)
        .on("value", (snapshot) => {
          const refVoca = snapshot.val();
          if (refVoca) {
            let newVocabularys = [];
            let list_id = Object.keys(refVoca);
            let datas = Object.values(refVoca);
            let length_list = list_id.length;
            let complete_count = 0;
            for (let i = 0; i < length_list; i++) {
              if (datas[i].step === 8) complete_count++;
              newVocabularys.push({
                vocabulary_id: list_id[i],
                en: datas[i].en,
                vi: datas[i].vi,
                progress: datas[i].step / 8,
                step: datas[i].step,
              });
            }
            if (length_list > 0) {
              setVocabularys(newVocabularys);
              let newUnit = firebase
                .database()
                .ref(
                  "units/" + route.params.userId + "/" + route.params.unit_id
                )
                .set({
                  name: route.params.name,
                  all: length_list,
                  count: complete_count,
                });
            }
          } else {
            setVocabularys([]);
          }
        });
    }
  }, [route.params.unit_id, route.params.userId]);

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
      <View style={tailwind("p-2 flex-none bg-white border-b border-gray-100")}>
        <View style={tailwind("flex-auto flex-row  px-2")}>
          <Text
            style={tailwind("font-bold  text-lg  text-gray-900")}
            multiline
            numberOfLines={1}
          >
            {unit && unit.name}
          </Text>
        </View>
        <View style={tailwind("flex flex-row justify-between mb-2 px-2")}>
          <Text style={tailwind("text-gray-600")} multiline numberOfLines={1}>
            Đã học thuộc {unit && unit.count} từ
          </Text>
          <Text style={tailwind("text-gray-600")} multiline numberOfLines={1}>
            {unit && unit.all} từ
          </Text>
        </View>
        <View style={tailwind("flex-auto px-2 justify-center")}>
          <Progress.Bar
            progress={unit ? unit.progress : 0}
            width={null}
            height={10}
            borderRadius={10}
            color={mapColor(unit ? unit.progress : 0)}
          />
        </View>
      </View>
      <FlatList
        style={tailwind("flex-grow")}
        contentContainerStyle={tailwind("p-1 flex-col pb-20")}
        data={vocabularys}
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
              if (vocabularys.length > 3) {
                navigation.navigate("StudyScreen", {
                  list: vocabularys,
                  unit_id: route.params.unit_id,
                });
              } else {
                alert("Thêm từ 4 từ để học");
              }
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
              navigation.navigate("AddVocabulary", {
                unit_id: route.params.unit_id,
              });
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
