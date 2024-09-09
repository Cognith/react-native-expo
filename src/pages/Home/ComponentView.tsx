import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import ComponentController from "./ComponentController";
import { PokemonCard, SearchBar } from "../../components";

export default class HomePage extends ComponentController {
  render() {
    const { pokemon } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={StyleSheet.flatten([
            styles.paddingContainer,
            { paddingVertical: Platform.OS === "android" ? 30 : 0 },
          ])}
        >
          <SearchBar />
          <FlatList
            data={pokemon}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PokemonCard
                item={item}
                onPress={() => this.navigateToDetail(item)}
              />
            )}
            ListFooterComponent={() => {
              const { isLoading } = this.state;
              if (isLoading) return <ActivityIndicator size="large" />;
              return null;
            }}
            onEndReachedThreshold={0.5}
            onEndReached={this.onEndReached}
            onScrollBeginDrag={this.onScrollBeginDrag}
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
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  contentContainerStyle: { paddingBottom: 30 },
});
