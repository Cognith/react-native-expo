// HomePage.tsx
import React from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "../../constanst/HomeStyles";
import HomeComponent from "../../components/HomeComponent"; // Import HomeComponent

export type RootStackParam = {
  Home: undefined;
  Detail: { pokemonUrl: string };
};

type HomePageProps = NativeStackScreenProps<RootStackParam, "Home">;

export default class HomePage extends React.Component<HomePageProps> {
  render(): JSX.Element {
    const { navigation, route } = this.props;

    // Provide a default or mock route if necessary
    const mockRoute = {
      params: {
        // Your default or mock route params here
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        {/* Render HomeComponent and pass necessary props */}
        <HomeComponent navigation={navigation} route={route || mockRoute} />
      </SafeAreaView>
    );
  }
}
