import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ComponentController from "./ComponentController";
import { IdBadge, PokemonDetail, SearchBar, TypeBadge } from "../../components";

export default class DetailPage extends ComponentController {
  render() {
    const { isLoading, pokemon } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.paddingContainer}>
          <SearchBar onChangeText={this.onChangeText} />
          {isLoading && <ActivityIndicator size={"large"} color={"white"} />}
          {!isLoading && pokemon && <PokemonDetail pokemon={pokemon} />}
          {!isLoading && !pokemon && (
            <Text style={styles.emptyDataText}>Pokemon not found</Text>
          )}
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
  contentContainer: { paddingHorizontal: 20, paddingVertical: 10 },
  idBadgeContainer: { alignSelf: "flex-start" },
  pokemonImage: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  nameText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionBox: {
    backgroundColor: "#3C3D37",
    borderRadius: 10,
    padding: 15,
  },
  descriptionText: {
    color: "#ECDFCC",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "500",
    marginBottom: 20,
  },
  typeText: { color: "white", fontWeight: "bold", marginBottom: 5 },
  typeContainer: { flexDirection: "row", marginBottom: 15 },
  typeBadgeWrapper: { marginRight: 6 },
  statsBox: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#40534C",
  },
  statWrapper: { flex: 1 },
  statNameText: { color: "#ECDFCC", marginBottom: 2 },
  statBaseStatText: { color: "white", fontWeight: "600" },
  columnWrapperStyle: {
    marginBottom: 14,
  },
});
