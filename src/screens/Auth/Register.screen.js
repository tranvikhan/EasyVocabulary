import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import tailwind from "tailwind-rn";
import KButton from "../../components/ui-kit/KButton";
import KTextInput from "../../components/ui-kit/KTextInput";
import { useAuth } from "../../Firebase/context";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModalError from "../../components/ui-kit/ModalError";
import firebase from "firebase";

const RegisterScreen = (props) => {
  const { signUp, setProcessAuth } = useAuth();
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("student");
  const navigation = useNavigation();
  const handlerRegister = () => {
    if (name.trim() === "") {
      setError("tên không được trống");
      return;
    }
    if (email.trim() === "") {
      setError("email không được trống");
      return;
    }
    if (password.trim() === "" || rePassword.trim() === "") {
      setError("mật khẩu và nhập lại mật khẩu không được trống");
      return;
    }
    if (password.length < 6) {
      setError("mật khẩu dài hơn 6 ký tự");
      return;
    }
    if (password != rePassword) {
      setError("nhập lại mật khẩu không đúng");
      return;
    }
    setProcessAuth(true);
    signUp(email, password)
      .then((data) => {
        let database = firebase.database();
        database.ref("users/" + data.user.uid).set({
          name: name,
          role: selectedRole,
          email: email,
          avatar: "userAvatar/default.png",
          gender: "unknown",
          address: "unknown",
          phoneNumber: "unknown",
          birthday: "unknown",
        });
        console.log(data);
        setProcessAuth(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <View style={tailwind("flex-1 flex-col")}>
      <ModalError
        isShow={error}
        toggle={() => {
          setError("");
        }}
      />
      <ImageBackground
        source={require("../../assets/image/bg8.jpg")}
        style={{
          flex: 1,
          resizeMode: "center",
          justifyContent: "center",
        }}
      >
        <View style={tailwind("justify-center items-center p-5")}>
          <View
            style={{
              ...tailwind("p-6 rounded-2xl bg-white w-full"),
              shadowColor: "#000",
              shadowOffset: {
                width: -2,
                height: -2,
              },
              shadowOpacity: 0.35,
              shadowRadius: 20,

              elevation: 30,
            }}
          >
            <Text
              style={tailwind(
                "text-gray-900 font-bold text-2xl text-center mb-6"
              )}
            >
              Đăng ký
            </Text>
            <View style={tailwind("mb-4")}>
              <Text style={tailwind("text-gray-700 mb-2")}>Tên của bạn</Text>
              <KTextInput
                placeholder="tên của bạn"
                multiline
                numberOfLines={1}
                value={name}
                onChangeText={(t) => setName(t)}
              />
            </View>
            <View style={tailwind("mb-4")}>
              <Text style={tailwind("text-gray-700 mb-2")}>Email</Text>
              <KTextInput
                keyboardType="email-address"
                placeholder="email"
                multiline
                numberOfLines={1}
                value={email}
                onChangeText={(t) => setEmail(t)}
              />
            </View>
            <View style={tailwind("text-gray-700 mb-2")}>
              <Text style={tailwind("text-gray-700 mb-2")}>Mật khẩu</Text>
              <KTextInput
                secureTextEntry={true}
                placeholder="mật khẩu"
                value={password}
                onChangeText={(t) => setPassword(t)}
              />
            </View>
            <View style={tailwind("text-gray-700 mb-2")}>
              <Text style={tailwind("text-gray-700 mb-2")}>
                Nhập lại mật khẩu
              </Text>
              <KTextInput
                secureTextEntry={true}
                placeholder="nhập lại mật khẩu"
                value={rePassword}
                onChangeText={(t) => setRePassword(t)}
              />
            </View>
            <Picker
              selectedValue={selectedRole}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedRole(itemValue)
              }
            >
              <Picker.Item label="Tài khoản học sinh" value="student" />
              <Picker.Item label="Tài khoản giáo viên" value="teacher" />
            </Picker>
            <View style={tailwind("mb-4 mt-4")}>
              <KButton
                text="Đăng ký"
                color="blue-500"
                fill
                block
                onPress={handlerRegister}
              />
            </View>
            <View style={tailwind("")}>
              <KButton
                text="Trở lại đăng nhập"
                color="blue-500"
                bgColor="blue-100"
                block
                onPress={() => {
                  navigation.navigate("LoginScreen");
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default RegisterScreen;
