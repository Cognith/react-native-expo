import { View, SafeAreaView, StyleSheet } from "react-native";
import ComponentController from "./ComponentController";
import { PokemonList, SearchBar } from "../../components";

export default class HomePage extends ComponentController {
  render() {
    const { pokemon, isLoading } = this.state;
    const { navigateToDetail, onEndReached, onScrollBeginDrag } = this;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.paddingContainer}>
          <SearchBar
            data-test-id="search-bar"
            onChangeText={this.onChangeText}
          />
          <PokemonList
            data-test-id="pokemon-list"
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
