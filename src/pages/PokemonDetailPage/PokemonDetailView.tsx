import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PokemonDetailController from "./PokemonDetailController";

export default class PokemonDetailPage extends PokemonDetailController {
  render() {
    return (
      <SafeAreaView>
        <Text data-test-id="hello-text">Hello World</Text>
      </SafeAreaView>
    );
  }
}
