import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import tailwind from "tailwind-rn";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ProgressCircle from "react-native-progress-circle";
import { LineChart } from "react-native-chart-kit";

export default function UserScreen(props) {
  const todayProgress = 0.6;
  const mapColor = (progress) => {
    if (progress === 0) return "#ffffff";
    if (progress < 0.25) return "#EF4444";
    if (progress < 0.5) return "#F59E0B";
    if (progress < 0.75) return "#6EE7B7";
    if (progress < 1) return "#34D399";
    return "#10B981";
  };
  const mapColor100 = (progress) => {
    if (progress === 0) return "#ffffff";
    if (progress < 0.25) return "#FEE2E2";
    if (progress < 0.5) return "#FEF3C7";
    if (progress < 0.75) return "#D1FAE5";
    if (progress < 1) return "#A7F3D0";
    return "#6EE7B7";
  };
  return (
    <View style={tailwind("flex-1 bg-gray-200")}>
      <View style={tailwind("flex-row justify-between bg-white")}>
        <TouchableOpacity>
          <Text style={tailwind("text-lg px-2 py-3 text-gray-900")}>
            Cài đặt
          </Text>
        </TouchableOpacity>
        <Text style={tailwind("text-lg px-2 py-3 font-bold text-gray-900")}>
          Thông tin
        </Text>
        <Text style={tailwind("text-lg px-2 py-3 text-gray-900")}>
          Đăng xuất
        </Text>
      </View>
      <View style={tailwind("flex-row justify-start items-center px-2 mt-2 ")}>
        <View
          style={tailwind(
            "flex-1 justify-center items-center bg-white rounded-xl"
          )}
        >
          <View style={tailwind("rounded-full p-4")}>
            <Image
              style={{
                ...tailwind("rounded-full"),
                width: 100,
                height: 100,
                resizeMode: "center",
              }}
              source={require("../assets/image/luong.jpg")}
            />
          </View>
          <Text style={tailwind("text-lg font-bold text-gray-700")}>
            Trần Vi Lượng
          </Text>
          <Text style={tailwind("text-lg mb-4 text-gray-500")}>Học sinh</Text>
        </View>
      </View>
      <View style={tailwind("flex-row justify-start items-center px-2 mt-2")}>
        <View
          style={tailwind(
            "flex-1 justify-center items-center bg-white rounded-xl"
          )}
        >
          <View style={tailwind("flex-row p-4 justify-between")}>
            <View style={tailwind("flex-grow justify-center")}>
              <Text style={tailwind("text-lg font-bold text-gray-800")}>
                Chỉ tiêu hôm nay
              </Text>
              <Text style={tailwind("text-lg mb-4 text-gray-600")}>
                10 từ vựng
              </Text>
            </View>
            <View style={tailwind("flex")}>
              <ProgressCircle
                percent={todayProgress * 100}
                radius={32}
                borderWidth={8}
                color={mapColor(todayProgress)}
                shadowColor={mapColor100(todayProgress)}
                bgColor="#fff"
              >
                {todayProgress > 0 && todayProgress < 1 && (
                  <Text style={{ fontSize: 14 }}>
                    {Math.round(todayProgress * 10000) / 100 + "%"}
                  </Text>
                )}
                {todayProgress === 1 && (
                  <FontAwesome5
                    size={22}
                    name="check"
                    color={mapColor(todayProgress)}
                  />
                )}
              </ProgressCircle>
            </View>
          </View>
        </View>
      </View>
      <View style={tailwind("flex-row justify-start items-center px-2 mt-2")}>
        <View style={tailwind("flex-1 justify-center  bg-white rounded-xl")}>
          <View style={tailwind("flex-col p-4")}>
            <Text style={tailwind("text-lg font-bold text-gray-800")}>
              Thống kê tuần
            </Text>
            <LineChart
              data={{
                labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                datasets: [
                  {
                    data: [10, 11, 2, 8, 7, 15, 5],
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.85} // from react-native
              height={120}
              yAxisLabel=""
              yAxisSuffix=" từ"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </View>
      <View style={tailwind("absolute bottom-0 left-0 right-0 text-center")}>
        <Text style={tailwind("text-sm mb-4 text-gray-400 text-center")}>
          Bản quyền phần mềm thuộc Trần Vi Lượng
        </Text>
      </View>
    </View>
  );
}
