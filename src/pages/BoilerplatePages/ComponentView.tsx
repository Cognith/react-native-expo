import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ComponentController from "./ComponentController";

export default class HomePage extends ComponentController {
  render() {
    return (
      <SafeAreaView>
        <Text data-test-id="hello-text">Hello World</Text>
      </SafeAreaView>
    );
  }
}
