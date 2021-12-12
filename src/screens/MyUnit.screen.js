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
import firebase from "firebase";
import { useAuth } from "../Firebase/context";
import { set } from "react-native-reanimated";

function MyUnit(props) {
  const navigation = useNavigation();
  const [modalNewUnit, setModalNewUnit] = React.useState(false);
  const [newUnitName, setNewUnitName] = React.useState("");
  const { currentUser } = useAuth();
  const [dataSource, setDataSource] = React.useState([]);
  React.useEffect(() => {
    if (currentUser)
      firebase
        .database()
        .ref("units/" + currentUser.uid)
        .on("value", function (snapshot) {
          if (snapshot) {
            const data = snapshot.val();
            if (data) {
              let newDataSource = [];
              let list_id = Object.keys(data);
              let list_unit = Object.values(data);
              for (let i = 0; i < list_id.length; i++) {
                newDataSource.push({
                  unit_id: list_id[i],
                  name: list_unit[i].name,
                  count: list_unit[i].count,
                  all: list_unit[i].all,
                  progress:
                    list_unit[i].all === 0
                      ? 0
                      : list_unit[i].count / list_unit[i].all,
                });
              }
              setDataSource(newDataSource);
            } else {
              setDataSource([]);
            }
          }
        });
  }, [currentUser]);

  return (
    <View style={tailwind("flex-1  bg-gray-200")}>
      <View style={tailwind("flex")}>
        <FlatList
          contentContainerStyle={tailwind("flex-col p-1")}
          data={dataSource}
          renderItem={({ item, index }) => (
            <UnitItem
              index={index}
              data={item}
              navigation={navigation}
              userId={currentUser.uid}
            />
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
              Thêm bài học
            </Text>
            <KTextInput
              placeholder="Nhập tên bài học"
              multiline
              numberOfLines={1}
              value={newUnitName}
              onChangeText={(value) => setNewUnitName(value)}
            />
            <View style={tailwind("flex flex-row mt-8  justify-between")}>
              <View style={tailwind("w-2/4 pr-2")}>
                <KButton
                  text="Hủy"
                  color="blue-500"
                  bgColor="blue-100"
                  block
                  onPress={() => {
                    setModalNewUnit(false);
                  }}
                />
              </View>
              <View style={tailwind("w-2/4 pl-2")}>
                <KButton
                  text="Thêm"
                  color="blue-500"
                  fill
                  block
                  onPress={() => {
                    if (newUnitName.trim() !== "" && currentUser) {
                      let newUnitRef = firebase
                        .database()
                        .ref("units/" + currentUser.uid)
                        .push();
                      newUnitRef.set({
                        name: newUnitName,
                        count: 0,
                        all: 0,
                      });
                    }
                    setModalNewUnit(!modalNewUnit);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MyUnit;
