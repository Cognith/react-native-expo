import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import ComponentController from "./ComponentController";
import { PokemonCard, SearchBar } from "../../components";

export default class HomePage extends ComponentController {
  render() {
    const { pokemon, isLoading } = this.state;
    const { onEndReached, onScrollBeginDrag } = this;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.paddingContainer}>
          <SearchBar
            data-test-id="search-bar"
            onChangeText={this.onChangeText}
          />
          <FlatList
            data-test-id="pokemon-list"
            data={pokemon}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PokemonCard item={item} navigation={this.props.navigation} />
            )}
            ListFooterComponent={() => {
              isLoading && (
                <ActivityIndicator data-test-id="pokemon-loader" size="large" />
              );
              return null;
            }}
            ListEmptyComponent={() => {
              !isLoading && (
                <Text
                  data-test-id="pokemon-not-found-text"
                  style={styles.emptyDataText}
                >
                  Pokemon not found
                </Text>
              );
              return null;
            }}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            onScrollBeginDrag={onScrollBeginDrag}
            contentContainerStyle={styles.contentContainerStyle}
            columnWrapperStyle={styles.columnWrapperStyle}
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
