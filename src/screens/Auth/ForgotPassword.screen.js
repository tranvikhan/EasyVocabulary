import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import tailwind from "tailwind-rn";
import KButton from "../../components/ui-kit/KButton";
import KTextInput from "../../components/ui-kit/KTextInput";
import { useAuth } from "../../Firebase/context";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModalError from "../../components/ui-kit/ModalError";

const ForgotPasswordScreen = (props) => {
  const { resetPassword } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handlerResetPassword = () => {
    resetPassword(email)
      .then(() => {
        setError("");
        alert("Kiễm tra email để đổi mật khẩu");
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
              Khôi phục mật khẩu
            </Text>
            <View style={tailwind("mb-4")}>
              <Text style={tailwind("text-gray-700 mb-2")}>Email</Text>
              <KTextInput
                keyboardType="email-address"
                placeholder="email"
                multiline
                value={email}
                numberOfLines={1}
                onChangeText={(t) => setEmail(t)}
              />
            </View>

            <View style={tailwind("mb-4")}>
              <KButton
                text="Lấy mật khẩu"
                color="blue-500"
                fill
                block
                onPress={handlerResetPassword}
              />
            </View>
            <View style={tailwind("")}>
              <KButton
                text="Trở về đăng nhập"
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
export default ForgotPasswordScreen;
