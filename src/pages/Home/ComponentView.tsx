import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import ComponentController from "./ComponentController";
import { PokemonCard } from "../../components";

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
          <TextInput
            placeholder="Search your pokemon here"
            placeholderTextColor="#ECDFCC"
            style={styles.searchBarContainer}
          />
          <FlatList
            data={pokemon}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <PokemonCard item={item} />}
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
  searchBarContainer: {
    color: "#ECDFCC",
    backgroundColor: "#3C3D37",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
    minHeight: 40,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  contentContainerStyle: { paddingBottom: 30 },
});
