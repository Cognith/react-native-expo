import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/BoilerplatePages/ComponentView";
import DetailsScreen from "../pages/BoilerplatePages/details/DetailsScreen";

type RootStackParam = {
  Home: undefined;
  Detail: { pokemonUrl: string };
};

const Stack = createNativeStackNavigator<RootStackParam>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            title: "PokeList",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailsScreen}
          options={{
            title: "Pokemon Details",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
