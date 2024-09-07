import PokemonsListController from './PokemonsListController';
import { SafeAreaView, Text } from 'react-native';

export default class PokemonsListView extends PokemonsListController {
  render() {
    return (
      <SafeAreaView>
        <Text data-test-id="hello-text">Hello World</Text>
      </SafeAreaView>
    );
  }
}
