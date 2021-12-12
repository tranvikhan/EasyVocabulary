import React from "react";
import { View, Text } from "react-native";
import tailwind from "tailwind-rn";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import KButton from "../ui-kit/KButton";
const ResultBlock = (props) => {
  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    setTime(props.time);
  }, []);
  const mapping = (t, a) => {
    let p = t / a;
    if (p < 0.25)
      return {
        lable: "KẾT QUẢ KÉM",
        color: "red-700",
        iconName: "emoticon-lol-outline",
        message: "Cố gắn nhiều hơn đi nào!",
      };
    if (p < 0.5)
      return {
        lable: "KẾT QUẢ YẾU",
        color: "red-500",
        iconName: "emoticon-sad-outline",
        message: "Cố gắn thêm nha!",
      };
    if (p < 0.75)
      return {
        lable: "KẾT QUẢ TRUNG BÌNH",
        color: "yellow-500",
        iconName: "emoticon-happy-outline",
        message: "Sắp thành công rồi đó!",
      };

    return {
      lable: "KẾT QUẢ TỐT",
      color: "green-500",
      iconName: "emoticon-wink-outline",
      message: "Làm tốt lắm!",
    };
  };
  return (
    <View
      style={tailwind("flex-1 bg-white justify-center items-center flex-col")}
    >
      <Text
        style={tailwind("text-blue-500 text-center mb-2 font-bold text-2xl")}
      >
        {mapping(props.trueV, props.allV).lable}
      </Text>
      <MaterialCommunityIcons
        name={mapping(props.trueV, props.allV).iconName}
        style={tailwind(`text-${mapping(props.trueV, props.allV).color}`)}
        size={160}
      />
      <Text
        style={tailwind(
          `text-${
            mapping(props.trueV, props.allV).color
          } text-center mt-2 font-bold text-3xl`
        )}
      >
        {props.trueV}/{props.allV}
      </Text>
      <Text
        style={tailwind("text-gray-800 text-center mt-1 font-medium text-lg")}
      >
        {"Thời gian hoàn thành: " + time}
      </Text>
      <Text
        style={tailwind("text-gray-800 text-center mt-1 font-medium text-lg")}
      >
        {mapping(props.trueV, props.allV).message}
      </Text>
      <View style={tailwind("items-center mt-4")}>
        <KButton text="OK" color="blue-500" fill block onPress={props.submit} />
      </View>
    </View>
  );
};
export default ResultBlock;
