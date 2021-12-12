import { useNavigation, useRoute } from "@react-navigation/native";
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
import firebase from "firebase";
import { useAuth } from "../Firebase/context";

const StudyScreen = (props) => {
  const navigation = useNavigation();
  const time = React.useRef("00:00");
  const [numQuests, setNumQuests] = React.useState(-99);
  const [numReview, setNumReview] = React.useState(0);
  const [question, setQuestion] = React.useState(null);
  const [trueVocaRight, setTrueVocaRight] = React.useState(null);
  const [reviewVoca, setReViewVoca] = React.useState(null);
  const [trueAnswerNum, setTrueAnswerNum] = React.useState(0);
  const [listVoca, setListVoca] = React.useState(null);
  const { currentUser } = useAuth();
  const route = useRoute();
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
      time.current = minutesStr + ":" + secondsStr;
    }, 1000);
    setListVoca([...route.params.list]);
    setNumQuests(-98);
    return () => {
      clearInterval(timer);
    };
  }, [route.params.list]);
  React.useEffect(() => {
    if (listVoca && listVoca.length > 0) {
      if (numQuests <= 0) {
        let tempList = listStep0(listVoca);
        if (tempList.length > 0 && numReview < 3) {
          setReViewVoca(tempList[0]);
          setNumReview(numReview + 1);
        } else {
          setReViewVoca(null);
          setNumQuests(1);
        }
      } else if (numQuests >= 1 && numQuests <= 10) {
        let tempVoca = null;
        tempVoca = randomInList(listStep1(listVoca));
        if (tempVoca) {
          setQuestion(tempVoca);
        } else {
          tempVoca = randomInList(listStep2To4(listVoca));
          if (tempVoca) {
            setQuestion(tempVoca);
          } else {
            tempVoca = randomInList(listStep5To7(listVoca));
            if (tempVoca) {
              setQuestion(tempVoca);
            } else {
              tempVoca = randomInList(listStep8(listVoca));
              if (tempVoca) {
                setQuestion(tempVoca);
              } else {
                setQuestion(null);
              }
            }
          }
        }
      } else {
        setQuestion(null);
      }
    }
  }, [numQuests]);

  const listStep0 = React.useCallback((list) => {
    return list.filter((t) => t.step === 0);
  }, []);
  const listStep1 = React.useCallback((list) => {
    return list.filter((t) => t.step === 1);
  }, []);
  const listStep2To4 = React.useCallback((list) => {
    return list.filter((t) => t.step > 1 && t.step < 5);
  }, []);
  const listStep5To7 = React.useCallback((list) => {
    return list.filter((t) => t.step > 4 && t.step < 8);
  }, []);
  const listStep8 = React.useCallback((list) => {
    let ontap = list.filter((t) => t.step === 8);

    return ontap.map((t) => ({ ...t, step: randomNum(1, 7) }));
  }, []);
  const randomInList = React.useCallback((list) => {
    if (list && list.length > 0) return list[randomNum(0, list.length - 1)];
    return null;
  }, []);
  const randomNum = React.useCallback((min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }, []);
  const updateVocabulary = React.useCallback((vocabulary, list) => {
    let coppy = null;
    firebase
      .database()
      .ref()
      .child("vocabularys")
      .child(route.params.unit_id)
      .child(vocabulary.vocabulary_id)
      .on("value", (snapshot) => {
        coppy = snapshot.val();
        if (coppy) {
          console.log(coppy);
        } else {
          alert("Từ vựng đã bị thay đổi hoặc có sự cố mạng!");
          navigation.goBack();
        }
      });
    if (vocabulary.step < 8 && coppy && coppy.step < 8) {
      if (vocabulary.step === 7) {
        let data_date = null;
        let date = new Date();
        let dateString =
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate();
        firebase
          .database()
          .ref("datas/" + currentUser.uid + "/" + dateString)

          .on("value", (snapshot) => {
            data_date = snapshot.val();
            console.log("KHAN ---------------------------------", data_date);
          });
        firebase
          .database()
          .ref("datas/" + currentUser.uid + "/" + dateString)
          .set(data_date ? data_date + 1 : 1);
      }

      firebase
        .database()
        .ref()
        .child("vocabularys")
        .child(route.params.unit_id)
        .child(vocabulary.vocabulary_id)
        .set({
          en: vocabulary.en,
          vi: vocabulary.vi,
          step: vocabulary.step + 1,
        });
      let newlistVoca = list.map((v) => {
        if (v.vocabulary_id === vocabulary.vocabulary_id) {
          return { ...v, step: vocabulary.step + 1 };
        } else {
          return v;
        }
      });
      setListVoca(newlistVoca);
    }
  }, []);
  const getNoise = React.useCallback((list, vocabulary) => {
    let listNoise = [];
    if (list && list.length > 0)
      while (listNoise.length < 3) {
        let choice = { ...list[randomNum(0, list.length - 1)] };
        let checklist = listNoise.filter(
          (t) => t.vocabulary_id === choice.vocabulary_id
        );
        if (
          choice.vocabulary_id !== vocabulary.vocabulary_id &&
          checklist.length === 0
        ) {
          listNoise.push(choice);
        }
      }
    return listNoise;
  }, []);
  return (
    <View style={tailwind("flex-1 bg-gray-200")}>
      {numQuests <= 10 ? (
        <>
          <View
            style={tailwind(
              "px-4 py-3 flex-row justify-between bg-white border-b border-gray-200 mb-0"
            )}
          >
            <Text
              multiline
              numberOfLines={1}
              style={tailwind("text-blue-500 font-semibold")}
            >
              {numQuests <= 0 ? "Học" : "Câu hỏi số: " + numQuests + "/10"}
            </Text>
            <Text
              multiline
              numberOfLines={1}
              style={tailwind("text-gray-800 font-semibold")}
            >
              {time.current}
            </Text>
          </View>
          {reviewVoca && (
            <GetReView
              vocabulary={reviewVoca}
              submit={() => {
                setNumQuests(numQuests + 1);
                updateVocabulary(reviewVoca, listVoca);
              }}
            />
          )}
          {question && trueVocaRight === null && (
            <GetQuestion
              vocabulary={question}
              noise={getNoise(route.params.list, question)}
              submit={(value) => {
                console.log(value);
                if (value.isTrue) {
                  updateVocabulary(question, listVoca);
                  setNumQuests(numQuests + 1);
                  setTrueAnswerNum(trueAnswerNum + 1);
                } else {
                  setTrueVocaRight({
                    vocabulary: question,
                    userAnswers: value.userQestion,
                  });
                }
              }}
            />
          )}
          {trueVocaRight && (
            <GetTrueQuestion
              vocabulary={trueVocaRight.vocabulary}
              userAnswers={trueVocaRight.userAnswers}
              submit={() => {
                setNumQuests(numQuests + 1);
                setTrueVocaRight(null);
              }}
            />
          )}
        </>
      ) : (
        <GetEnd
          trueAnswer={trueAnswerNum}
          time={time.current}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const GetQuestion = (props) => {
  const randomNum = React.useCallback((min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }, []);
  if (props.vocabulary === null || props.noise == null) return <></>;
  if (props.vocabulary.step === 1)
    return (
      <LevelA
        submit={props.submit}
        data={{
          en: props.vocabulary.en,
          vi: props.vocabulary.vi,
          isTrue: randomNum(0, 10) > 5 ? true : false,
          noise: [...props.noise],
        }}
      />
    );
  if (props.vocabulary.step == 2)
    return (
      <LevelB
        submit={props.submit}
        data={{
          en: props.vocabulary.en,
          vi: props.vocabulary.vi,
          isTrue: true,
          noise: [...props.noise],
        }}
      />
    );
  if (props.vocabulary.step == 3)
    return (
      <LevelC
        submit={props.submit}
        data={{
          en: props.vocabulary.en,
          vi: props.vocabulary.vi,
          isTrue: true,
          noise: [...props.noise],
        }}
      />
    );
  if (props.vocabulary.step == 4)
    return (
      <LevelD
        submit={props.submit}
        data={{
          en: props.vocabulary.en,
          vi: props.vocabulary.vi,
          isTrue: true,
          noise: [...props.noise],
        }}
      />
    );
  if (props.vocabulary.step == 5)
    return (
      <LevelE
        submit={props.submit}
        data={{
          en: props.vocabulary.en,
          vi: props.vocabulary.vi,
          isTrue: true,
          noise: [...props.noise],
        }}
      />
    );
  if (props.vocabulary.step == 6)
    return (
      <LevelF
        submit={props.submit}
        data={{
          en: props.vocabulary.en,
          vi: props.vocabulary.vi,
          isTrue: true,
          noise: [...props.noise],
        }}
      />
    );
  if (props.vocabulary.step == 7)
    return (
      <LevelH
        submit={props.submit}
        data={{
          en: props.vocabulary.en,
          vi: props.vocabulary.vi,
          isTrue: true,
          noise: [...props.noise],
        }}
      />
    );
};
const GetReView = (props) => {
  if (props.vocabulary == null) return <></>;
  return (
    <Review
      data={{
        en: props.vocabulary.en,
        vi: props.vocabulary.vi,
      }}
      submit={props.submit}
    />
  );
};
const GetTrueQuestion = (props) => {
  if (props.vocabulary == null || props.userAnswers == null) return <></>;
  return (
    <RightBlock
      correct={{ en: props.vocabulary.en, vi: props.vocabulary.vi }}
      userQestion={props.userAnswers}
      submit={props.submit}
    />
  );
};
const GetEnd = (props) => {
  return (
    <ResultBlock
      trueV={props.trueAnswer}
      allV={10}
      time={props.time}
      submit={() => {
        props.navigation.goBack();
      }}
    />
  );
};

export default StudyScreen;
