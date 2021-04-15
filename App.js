import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainMenu from "./src/navigations/MainNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <MainMenu />
    </NavigationContainer>
  );
}
