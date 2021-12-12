import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainMenu from "./src/navigations/MainNavigation";
import { AuthProvider } from "./src/Firebase";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainMenu />
      </NavigationContainer>
    </AuthProvider>
  );
}
