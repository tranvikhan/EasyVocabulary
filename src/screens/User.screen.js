import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ProgressCircle from "react-native-progress-circle";
import { LineChart } from "react-native-chart-kit";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../Firebase/context";
import { useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import firebase from "firebase";
import { set } from "react-native-reanimated";

export default function UserScreen(props) {
  const navigation = useNavigation();
  const userRef = React.useRef(null);
  const [avatarURL, setAvatarURL] = React.useState(null);
  const [dataDate, setDataDate] = React.useState(0);
  const [lable, SetLable] = React.useState([]);
  const [day0, setDay0] = React.useState(0);
  const [day1, setDay1] = React.useState(0);
  const [day2, setDay2] = React.useState(0);
  const [day3, setDay3] = React.useState(0);
  const [day4, setDay4] = React.useState(0);
  const [day5, setDay5] = React.useState(0);
  const [day6, setDay6] = React.useState(0);

  const [user, setUser] = React.useState({
    name: "",
    role: "",
    email: "",
    avatar: "",
    gender: "",
    address: "",
    phoneNumber: "",
    birthday: "",
  });

  const { signOut, setProcessAuth, currentUser } = useAuth();
  const mapColor = (progress) => {
    if (progress < 0.25) return "#EF4444";
    if (progress < 0.5) return "#F59E0B";
    if (progress < 0.75) return "#6EE7B7";
    if (progress < 1) return "#34D399";
    return "#10B981";
  };
  const mapColor100 = (progress) => {
    if (progress < 0.25) return "#FEE2E2";
    if (progress < 0.5) return "#FEF3C7";
    if (progress < 0.75) return "#D1FAE5";
    if (progress < 1) return "#A7F3D0";
    return "#6EE7B7";
  };

  React.useEffect(() => {
    setDay0(0);
    setDay1(0);
    setDay2(0);

    setDay3(0);
    setDay4(0);
    setDay5(0);
    setDay6(0);
    userRef.current = firebase
      .database()
      .ref("users/" + currentUser.uid)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        setUser(data);
      });
    let date = new Date();
    let dateString =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    firebase
      .database()
      .ref("datas/" + currentUser.uid + "/" + dateString)

      .on("value", (snapshot) => {
        let data_date = snapshot.val();
        setDataDate(data_date ? data_date : 0);
      });
    let today = new Date();
    let arrayDay = [];
    let arrayLable = [];
    for (let i = 6; i >= 0; i--) {
      let dateA = new Date();
      dateA.setDate(today.getDate() - i);
      let dateString =
        dateA.getFullYear() +
        "/" +
        (dateA.getMonth() + 1) +
        "/" +
        dateA.getDate();
      let labelString = dateA.getDate() + "-" + (dateA.getMonth() + 1);
      arrayDay.push(dateString);
      arrayLable.push(labelString);
    }
    SetLable(arrayLable);
    firebase
      .database()
      .ref("datas/" + currentUser.uid + "/" + arrayDay[0])
      .on("value", (snapshot) => {
        let data_date = snapshot.val();

        if (data_date) setDay0(data_date);
        setDay0(0);
      });
    firebase
      .database()
      .ref("datas/" + currentUser.uid + "/" + arrayDay[1])
      .on("value", (snapshot) => {
        let data_date = snapshot.val();

        if (data_date) setDay1(data_date);
        setDay1(0);
      });
    firebase
      .database()
      .ref("datas/" + currentUser.uid + "/" + arrayDay[2])
      .on("value", (snapshot) => {
        let data_date = snapshot.val();

        if (data_date) setDay2(data_date);
        else setDay2(0);
      });
    firebase
      .database()
      .ref("datas/" + currentUser.uid + "/" + arrayDay[3])
      .on("value", (snapshot) => {
        let data_date = snapshot.val();

        if (data_date) setDay3(data_date);
        else setDay3(0);
      });
    firebase
      .database()
      .ref("datas/" + currentUser.uid + "/" + arrayDay[4])
      .on("value", (snapshot) => {
        let data_date = snapshot.val();

        if (data_date) setDay4(data_date);
        else setDay4(0);
      });
    firebase
      .database()
      .ref("datas/" + currentUser.uid + "/" + arrayDay[5])
      .on("value", (snapshot) => {
        let data_date = snapshot.val();

        if (data_date) setDay5(data_date);
        else setDay5(0);
      });
    firebase
      .database()
      .ref("datas/" + currentUser.uid + "/" + arrayDay[6])
      .on("value", (snapshot) => {
        let data_date = snapshot.val();

        if (data_date) setDay6(data_date);
        else setDay6(0);
      });
  }, [currentUser]);

  React.useEffect(() => {
    if (user.avatar !== "") {
      firebase
        .storage()
        .ref()
        .child(user.avatar)
        .getDownloadURL()
        .then((url) => {
          setAvatarURL(url);
        })
        .catch((error) => {
          setAvatarURL(null);
        });
    } else {
      setAvatarURL(null);
    }
  }, [user.avatar]);
  return (
    <View style={tailwind("flex-1 bg-gray-200")}>
      <ScrollView style={tailwind("p-2")}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={tailwind("bg-white rounded-xl mb-2 flex-row")}
        >
          <View style={tailwind("rounded-full p-4")}>
            <Image
              style={{
                ...tailwind("rounded-full"),
                width: 100,
                height: 100,
                resizeMode: "center",
              }}
              source={
                avatarURL !== ""
                  ? {
                      uri: avatarURL,
                    }
                  : require("../assets/image/luong.jpg")
              }
            />
          </View>
          <View style={tailwind("flex-grow justify-center items-center px-2")}>
            <Text
              multiline
              numberOfLines={1}
              style={tailwind("text-lg font-bold text-gray-700")}
            >
              {user.name}
            </Text>
            <Text style={tailwind("text-lg mb-4 text-gray-500")}>
              {user.role === "student" ? "Học sinh" : "Giáo viên"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={tailwind(
            "flex-1 justify-center items-center bg-white rounded-xl mb-2"
          )}
        >
          <View style={tailwind("flex-row p-4 justify-between")}>
            <View style={tailwind("flex-grow justify-center")}>
              <Text style={tailwind("text-lg font-bold text-gray-800")}>
                Chỉ tiêu hôm nay
              </Text>
              <Text style={tailwind("text-lg text-gray-600")}>10 từ vựng</Text>
            </View>
            <View style={tailwind("flex")}>
              <ProgressCircle
                percent={(dataDate / 10) * 100}
                radius={32}
                borderWidth={8}
                color={mapColor(dataDate / 10)}
                shadowColor={mapColor100(dataDate / 10)}
                bgColor="#fff"
              >
                {dataDate / 10 >= 1 ? (
                  <FontAwesome5
                    size={22}
                    name="check"
                    color={mapColor(dataDate / 10)}
                  />
                ) : (
                  <Text style={{ fontSize: 14 }}>
                    {Math.round((dataDate / 10) * 10000) / 100 + "%"}
                  </Text>
                )}
              </ProgressCircle>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={tailwind("bg-white rounded-xl mb-2")}
        >
          <View style={tailwind("flex-col p-4")}>
            <Text style={tailwind("text-lg font-bold text-gray-800")}>
              Thống kê tuần
            </Text>
            <LineChart
              data={{
                labels: [...lable],
                datasets: [
                  {
                    data: [day0, day1, day2, day3, day4, day5, day6],
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.85} // from react-native
              height={180}
              yAxisLabel=""
              yAxisSuffix=" từ"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#3B82F6",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </TouchableOpacity>
        <BtnAction
          text="Cài đặt"
          onPress={() => {
            navigation.navigate("SettingScreen");
          }}
          icon={<Feather name="settings" size={16} />}
        />
        <BtnAction
          onPress={() => {
            navigation.navigate("AuthorScreen");
          }}
          text="Thông tin tác giả"
          icon={<Feather name="info" size={16} />}
        />

        <View style={tailwind("mb-4")}>
          <BtnAction
            text="Đăng xuất"
            onPress={() => {
              setProcessAuth(false);
              signOut();
            }}
            icon={<Feather name="log-out" size={16} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const BtnAction = (props) => (
  <TouchableOpacity
    {...props}
    activeOpacity={0.6}
    style={tailwind("flex-row p-4 items-center bg-white rounded-xl mb-2")}
  >
    <View style={tailwind("")}>{props.icon}</View>
    <View style={tailwind("flex-grow pl-2 justify-center")}>
      <Text style={tailwind("text-lg font-bold text-gray-600")}>
        {props.text}
      </Text>
    </View>
  </TouchableOpacity>
);
