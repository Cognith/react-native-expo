import PokemonDetailsController from './PokemonDetailsController';
import { SafeAreaView, Text } from 'react-native';

export default class PokemonDetailsView extends PokemonDetailsController {
  render() {
    return (
      <SafeAreaView>
        <Text data-test-id="hello-text">Hello World</Text>
      </SafeAreaView>
    );
  }
}
