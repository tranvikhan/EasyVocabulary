import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
} from "react-native";
import tailwind from "tailwind-rn";

import AntDesign from "react-native-vector-icons/AntDesign";
import UnitItem from "../components/UnitItem";
import { useNavigation } from "@react-navigation/native";
import KButton from "../components/ui-kit/KButton";
import KTextInput from "../components/ui-kit/KTextInput";

const dataSource = [
  {
    name: "Test Unit 1",
    count: 1,
    all: 10,
    progress: 0.1,
  },
  {
    name: "Test Unit 2",
    count: 9,
    all: 18,
    progress: 0.5,
  },
];
function TestUnit(props) {
  const navigation = useNavigation();
  const [modalNewUnit, setModalNewUnit] = React.useState(false);
  const [newUnitName, setNewUnitName] = React.useState("");

  return (
    <View style={tailwind("flex-1  bg-gray-200")}>
      <View style={tailwind("flex")}>
        <FlatList
          contentContainerStyle={tailwind("flex p-1")}
          data={dataSource}
          renderItem={({ item, index }) => (
            <UnitItem index={index} data={item} navigation={navigation} />
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity
        style={{
          ...tailwind("rounded-full bg-blue-100 p-1 absolute bottom-5 right-5"),
        }}
        activeOpacity={0.5}
        onPress={() => {
          setModalNewUnit(true);
        }}
      >
        <AntDesign
          style={{
            ...tailwind("text-blue-500"),
          }}
          name="pluscircle"
          size={46}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalNewUnit}
        onRequestClose={() => {
          setModalNewUnit(!modalNewUnit);
        }}
      >
        <View
          style={tailwind("w-full h-full flex justify-center items-center")}
        >
          <TouchableOpacity
            style={tailwind(
              "bg-gray-900 opacity-50 w-full h-full absolute top-0 left-0"
            )}
            activeOpacity={0.5}
            onPress={() => {
              setModalNewUnit(!modalNewUnit);
            }}
          ></TouchableOpacity>
          <View style={tailwind("bg-white w-11/12 rounded-2xl p-8")}>
            <Text
              style={tailwind(
                "text-gray-900 font-bold text-2xl text-center mb-8"
              )}
            >
              Th??m b??i h???c
            </Text>
            <KTextInput placeholder="Nh???p t??n b??i h???c" />
            <View style={tailwind("flex flex-row mt-8  justify-between")}>
              <View style={tailwind("w-2/4 pr-2")}>
                <KButton
                  text="H???y"
                  color="blue-500"
                  bgColor="blue-100"
                  block
                  onPress={() => {
                    setModalNewUnit(false);
                  }}
                />
              </View>
              <View style={tailwind("w-2/4 pl-2")}>
                <KButton text="Th??m" color="blue-500" fill block />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default TestUnit;
