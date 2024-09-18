import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import ComponentController from "./ComponentController";
import { PokemonCard, PokemonList, SearchBar } from "../../components";

export default class HomePage extends ComponentController {
  render() {
    const { pokemon, isLoading } = this.state;
    const { navigateToDetail, onEndReached, onScrollBeginDrag } = this;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.paddingContainer}>
          <SearchBar onChangeText={this.onChangeText} />
          <PokemonList
            pokemon={pokemon}
            isLoading={isLoading}
            onPress={navigateToDetail}
            onEndReached={onEndReached}
            onScrollBeginDrag={onScrollBeginDrag}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E201E",
  },
  paddingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyDataText: { color: "#ECDFCC", alignSelf: "center" },
  columnWrapperStyle: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  contentContainerStyle: { paddingBottom: 30 },
});
