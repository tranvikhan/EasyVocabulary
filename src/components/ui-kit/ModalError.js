import React from "react";
import { View, TouchableOpacity, Modal, Text } from "react-native";
import tailwind from "tailwind-rn";
import KButton from "./KButton";
import KTextInput from "./KTextInput";

export default function ModalError(props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isShow != ""}
      onRequestClose={() => {
        props.toggle();
      }}
    >
      <View style={tailwind("w-full h-full flex justify-center items-center")}>
        <TouchableOpacity
          style={tailwind(
            "bg-gray-900 opacity-50 w-full h-full absolute top-0 left-0"
          )}
          activeOpacity={0.5}
          onPress={() => {
            props.toggle();
          }}
        ></TouchableOpacity>
        <View style={tailwind("bg-white w-11/12 rounded-2xl p-8")}>
          <Text
            style={tailwind("text-red-500 font-bold text-2xl text-center mb-8")}
          >
            Lỗi
          </Text>
          <View>
            <Text
              multiline
              numberOfLines={4}
              style={tailwind("text-center text-xl")}
            >
              {props.isShow}
            </Text>
          </View>
          <View style={tailwind("flex mt-8")}>
            <KButton
              text="OK"
              color="blue-500"
              bgColor="blue-100"
              block
              onPress={() => {
                props.toggle();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
