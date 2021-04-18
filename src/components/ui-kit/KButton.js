import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import tailwind from "tailwind-rn";
export default function KButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={
        props.fill
          ? tailwind(
              `rounded-xl ${props.block ? "w-full" : ""} py-2 px-4 bg-${
                props.color ? props.color : ""
              }`
            )
          : tailwind(
              `rounded-xl ${props.block ? "w-full" : ""} py-2 px-4 border-${
                props.color ? props.color : ""
              }  border ${
                props.bgColor ? "bg-" + props.bgColor + " border-0" : ""
              }`
            )
      }
      {...props}
    >
      <View style={tailwind("flex-row")}>
        {props.icon && (
          <View style={tailwind("mr-2 justify-center")}>{props.icon}</View>
        )}
        <Text
          style={tailwind(
            `${props.icon ? "flex-grow" : "text-center"} ${
              props.fill
                ? "text-white"
                : props.color
                ? "text-" + props.color
                : "text-gray-900"
            } text-lg flex-grow`
          )}
        >
          {props.text && props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
