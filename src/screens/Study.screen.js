import React from "react";
import { View, Text } from "react-native";
import tailwind from "tailwind-rn";
import LevelA from "../components/study-kit/Level/LevelA";
import LevelB from "../components/study-kit/Level/LevelB";
import LevelC from "../components/study-kit/Level/LevelC";
import LevelD from "../components/study-kit/Level/LevelD";
import LevelE from "../components/study-kit/Level/LevelE";
import LevelF from "../components/study-kit/Level/LevelF";
import LevelH from "../components/study-kit/Level/LevelH";
import ResultBlock from "../components/study-kit/Result";
import Review from "../components/study-kit/Review";
import RightBlock from "../components/study-kit/Right";

const StudyScreen = (props) => {
  const [time, setTime] = React.useState("00:00");
  const [mocktime, setMockTime] = React.useState(0);
  React.useEffect(() => {
    let minutes = 0;
    let seconds = 0;
    let timer = setInterval(() => {
      seconds = seconds + 1;

      if (seconds === 60) {
        seconds = 0;
        minutes = minutes + 1;
      }
      let minutesStr = minutes < 10 ? "0" + minutes : minutes;
      let secondsStr = seconds < 10 ? "0" + seconds : seconds;
      setTime(minutesStr + ":" + secondsStr);
      setMockTime(mocktime + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <View style={tailwind("flex-1 bg-gray-200")}>
      {/*    <View
        style={tailwind(
          "px-4 py-3 flex-row justify-between bg-white border-b border-gray-200 mb-0"
        )}
      >
        <Text
          multiline
          numberOfLines={1}
          style={tailwind("text-blue-500 font-semibold")}
        >
          1/4
        </Text>
        <Text
          multiline
          numberOfLines={1}
          style={tailwind("text-gray-800 font-semibold")}
        >
          {time}
        </Text>
      </View> */}

      {/*         <LevelA
          submit={(kq) => {
            alert(JSON.stringify(kq));
          }}
          data={{
            en: "red",
            vi: "màu đỏ",
            isTrue: true,
            noise: [
              { en: "blue", vi: "màu xanh" },
              { en: "green", vi: "màu xanh lá cây" },
              { en: "black", vi: "màu đen" },
            ],
          }}
        /> */}

      {/* <LevelB
        submit={(kq) => {
          alert(JSON.stringify(kq));
        }}
        data={{
          en: "red",
          vi: "màu đỏ",
          noise: [
            { en: "blue", vi: "màu xanh" },
            { en: "green", vi: "màu xanh lá cây" },
            { en: "black", vi: "màu đen" },
          ],
        }}
      /> */}

      {/* <LevelC
        submit={(kq) => {
          alert(JSON.stringify(kq));
        }}
        data={{
          en: "red",
          vi: "màu đỏ",
          noise: [
            { en: "blue", vi: "màu xanh" },
            { en: "green", vi: "màu xanh lá cây" },
            { en: "black", vi: "màu đen" },
          ],
        }}
      /> */}
      {/* 
      <LevelD
        submit={(kq) => {
          alert(JSON.stringify(kq));
        }}
        data={{
          en: "red",
          vi: "màu đỏ",
          noise: [
            { en: "blue", vi: "màu xanh" },
            { en: "green", vi: "màu xanh lá cây" },
            { en: "black", vi: "màu đen" },
          ],
        }}
      /> */}

      {/*     <LevelE
        submit={(kq) => {
          alert(JSON.stringify(kq));
        }}
        data={{
          en: "red",
          vi: "màu đỏ",
          noise: [
            { en: "blue", vi: "màu xanh" },
            { en: "green", vi: "màu xanh lá cây" },
            { en: "black", vi: "màu đen" },
          ],
        }}
      /> */}
      {/* 
      <LevelF
        submit={(kq) => {
          alert(JSON.stringify(kq));
        }}
        data={{
          en: "red",
          vi: "màu đỏ",
          noise: [
            { en: "blue", vi: "màu xanh" },
            { en: "green", vi: "màu xanh lá cây" },
            { en: "black", vi: "màu đen" },
          ],
        }}
      /> */}

      {/*     <LevelH
        submit={(kq) => {
          alert(JSON.stringify(kq));
        }}
        data={{
          en: "red",
          vi: "màu đỏ",
          noise: [
            { en: "blue", vi: "màu xanh" },
            { en: "green", vi: "màu xanh lá cây" },
            { en: "black", vi: "màu đen" },
          ],
        }}
      /> */}

      {/* <RightBlock
        correct={{ en: "hello", vi: "xin chào" }}
        userQestion="xin lỗi"
      /> */}

      {/*  <Review
        data={{
          en: "Fish",
          vi: "Cá",
        }}
      /> */}

      <ResultBlock trueV={5} allV={6} time={time} />
    </View>
  );
};
export default StudyScreen;
