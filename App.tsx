import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import routeMap from "./src/routes/routeMap";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const Stack = createStackNavigator();

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
    hideSplashScreen();
  }, []);

  return (
    <NavigationContainer
      independent={true}
      children={
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          {routeMap.map((Current, index) => {
            const CurrentComponent = Current.component;
            return (
              <Stack.Screen
                name={Current.path}
                component={CurrentComponent}
                key={index}
              />
            );
          })}
        </Stack.Navigator>
      }
    />
  );
}
