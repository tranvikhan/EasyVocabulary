import React from "react";
import { TextInput } from "react-native";
import tailwind from "tailwind-rn";

export default function KTextInput(props) {
  return (
    <TextInput
      style={tailwind("rounded-xl w-full py-2 px-4 text-gray-800 bg-gray-100 ")}
      {...props}
    ></TextInput>
  );
}
