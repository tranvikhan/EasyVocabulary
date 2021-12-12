import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import * as Linking from "expo-linking";
import tailwind from "tailwind-rn";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function AuthorScreen(props) {
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
              source={require("../assets/image/luong.jpg")}
            />
          </View>
          <View style={tailwind("flex-grow justify-center  px-2")}>
            <Text
              multiline
              numberOfLines={1}
              style={tailwind("text-lg font-bold text-gray-700")}
            >
              Tác giả: Trần Vi Lượng
            </Text>
            <Text style={tailwind("text-lg mb-4 text-gray-500")}>
              12CB5 - THPT Lương Tâm
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={tailwind("bg-white rounded-xl mb-2")}
        >
          <View style={tailwind("flex-col p-4")}>
            <Text style={tailwind("text-lg font-bold text-gray-800")}>
              Ý tưởng của người dự thi
            </Text>
            <Text style={tailwind("text-gray-800")}>
              Trước sự hội nhập của thế giới các công ty nước ngoài ngày càng
              phát triển, rất nhiều tài liệu học tập hay của các tổ chức giáo
              dục, các trường đại học lớn đều được viết bằng tiếng anh, bởi lẻ
              tiếng anh được coi là một ngôn ngữ chung của toàn cầu. Việc học
              tiếng anh rất quan trọng đặc biệt đối với các học sinh còn ngồi
              trên ghế nhà trường. Thế muốn học tiếng anh thì phải bắt đầu từ
              đâu? Đó cũng là câu hỏi chung của nhưng người chưa biết gì về
              tiếng anh và muốn học chúng. Để tiếp cận và học tốt một loại ngôn
              ngữ mới bạn cần nắm rõ nghĩa của từ thông qua từ vựng trong tiếng
              anh, từ vựng như chiếc chìa khóa giúp bạn tiếp cận với thế giới
              ngoại ngữ. Trước cả khi bạn hiểu về những cấu trúc ngữ pháp phức
              tạp hay những mẫu câu tiếng anh, bạn nên có sự am hiểu nhất định
              về từ vựng. Nhận thấy được tầm quan trọng của từ vựng trong tiếng
              anh, nhầm mang lại cách học từ vựng mới mẻ dành cho các bạn học
              sinh, Em đả nghiên cứu và tạo ra “Phần Mềm Học Từ Vựng Trên Lớp”
              không như cách học cũ, học từ vựng trên lớp phải viết ra giấy
              nhiều lần thì mới nhớ nghĩa của từ, “Phần Mềm Học Từ Vựng Trên
              Lớp” sẽ cho bạn cách học hoàn toàn mới ngoài việc hiểu nghĩa phần
              mền sẽ rèn luyện cho bạn cách phát âm chuẩn các từ, viết đúng
              chính tả của từ, ghi nhớ từ vựng và nghĩa dựa vào nguyên lí
              Multiple-Choice Questions (Câu hỏi trắc nghiệm) và Spaced
              Repetition (Lặp Lại Giãn Cách)
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={tailwind("bg-white rounded-xl mb-2")}
        >
          <View style={tailwind("flex-col p-4")}>
            <Text style={tailwind("text-lg font-bold text-gray-800")}>
              Liên hệ
            </Text>
            <Text style={tailwind("text-gray-800")}>Họ tên: Trần Vi Lượng</Text>
            <Text style={tailwind("text-gray-800")}>Lớp: 12CB5</Text>
            <Text style={tailwind("text-gray-800")}>
              Trường: THPT Lương Tâm
            </Text>
            <Text style={tailwind("text-gray-800")}>
              Email:tranviluong01012003@gmail.com
            </Text>
            <Text style={tailwind("text-gray-800")}>Sđt: 0326055965</Text>
          </View>
        </TouchableOpacity>
        <BtnAction
          text="Hướng dẫn sử dụng"
          onPress={() => {
            Linking.openURL(
              "https://drive.google.com/file/d/1zMtGor9WCzjO25qEqk2a7IZnl-QpAAU9/view?usp=sharing"
            );
          }}
          icon={<MaterialCommunityIcons name="help-circle" size={16} />}
        />
        <BtnAction
          text="Facebook"
          onPress={() => {
            if (Platform.OS === "android") {
              Linking.openURL(
                "fb://facewebmodal/f?href=https://www.facebook.com/viluong.tk"
              );
            } else {
              Linking.openURL(
                "fb://page/f?href=https://www.facebook.com/viluong.tk"
              );
            }
          }}
          icon={<MaterialCommunityIcons name="facebook" size={16} />}
        />

        <View style={tailwind("mb-4")}>
          <BtnAction
            text="SMS"
            onPress={() => {
              Linking.openURL("sms:+84326055965");
            }}
            icon={<MaterialCommunityIcons name="message" size={16} />}
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
