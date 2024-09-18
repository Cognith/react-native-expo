import { Component } from "react";
import { Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Pokemon } from "../../types";
import PokemonCard from "../PokemonCard";

interface Props {
  pokemon: Pokemon[];
  isLoading: boolean | false;
  onPress: (item: any) => void;
  onEndReached: () => void;
  onScrollBeginDrag: () => void;
}

export class PokemonList extends Component<Props> {
  render() {
    const { pokemon, isLoading, onPress, onEndReached, onScrollBeginDrag } =
      this.props;
    return (
      <FlatList
        data={pokemon}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard item={item} onPress={() => onPress(item)} />
        )}
        ListFooterComponent={() => {
          if (isLoading) return <ActivityIndicator size="large" />;
          return null;
        }}
        ListEmptyComponent={() => {
          if (!isLoading)
            return <Text style={styles.emptyDataText}>Pokemon not found</Text>;
          return null;
        }}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        onScrollBeginDrag={onScrollBeginDrag}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    );
  }
}

export default PokemonList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E201E",
  },
  paddingContainer: {
    paddingHorizontal: 20,
  },
  emptyDataText: { color: "#ECDFCC", alignSelf: "center" },
  columnWrapperStyle: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  contentContainerStyle: { paddingBottom: 30 },
});
