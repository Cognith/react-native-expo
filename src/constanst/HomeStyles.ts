import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "black",
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "grey",
  },
  item: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "grey",
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonInfo: {
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 16,
    textTransform: "capitalize",
    marginTop: 10,
    fontWeight: "bold",
  },
});
