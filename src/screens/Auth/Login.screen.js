import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import tailwind from "tailwind-rn";
import { useAuth } from "../../Firebase/context";
import { useNavigation, useRoute } from "@react-navigation/native";
import KTextInput from "../../components/ui-kit/KTextInput";
import KButton from "../../components/ui-kit/KButton";
import ModalError from "../../components/ui-kit/ModalError";

const LoginScreen = (props) => {
  const { signIn, setProcessAuth } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("tvluong@gmail.com");
  const [password, setPassword] = React.useState("123456");
  const [error, setError] = React.useState("");

  const handlerLogin = () => {
    signIn(email, password)
      .then(() => {
        setError("");
        setProcessAuth(false);
      })
      .catch((e) => {
        console.log(e);
        setError("Không thể đăng nhập: " + e.message);
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
              Đăng nhập
            </Text>
            <View style={tailwind("mb-4")}>
              <Text style={tailwind("text-gray-700 mb-2")}>Email</Text>
              <KTextInput
                value={email}
                keyboardType="email-address"
                placeholder="email"
                onChangeText={(v) => {
                  setEmail(v);
                }}
              />
            </View>
            <View style={tailwind("text-gray-700 mb-2")}>
              <Text style={tailwind("text-gray-700 mb-2")}>Mật khẩu</Text>
              <KTextInput
                value={password}
                secureTextEntry={true}
                placeholder="mật khẩu"
                onChangeText={(v) => {
                  setPassword(v);
                }}
              />
            </View>
            <TouchableOpacity
              style={tailwind(" mt-2 mb-4")}
              onPress={() => {
                navigation.navigate("ForgotPasswordScreen");
              }}
            >
              <Text style={tailwind("text-gray-400 text-center")}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
            <View style={tailwind("mb-4")}>
              <KButton
                text="Đăng nhập"
                color="blue-500"
                fill
                block
                onPress={handlerLogin}
              />
            </View>
            <View style={tailwind("")}>
              <KButton
                text="Đăng ký"
                color="blue-500"
                bgColor="blue-100"
                block
                onPress={() => {
                  navigation.navigate("RegisterScreen");
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;
