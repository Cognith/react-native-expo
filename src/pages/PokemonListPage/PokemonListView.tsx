import { FlatList, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PokemonListController from "./PokemonListController";
import { styles } from "./styles";

export default class PokemonListPage extends PokemonListController {
  constructor(props: any) {
    super(props);
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  render() {
    const { data } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TextInput onChangeText={this.handleSetSearch} />
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          numColumns={2}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={() => this.getData()}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    );
  }
}
