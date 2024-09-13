import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonName: {
    fontSize: 24,
    textTransform: "capitalize",
    marginTop: 20,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
  pokemonImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
    color: "black",
    fontWeight: "bold",
  },
  statsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "black",
  },
  statsRowContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  statsColumn: {
    flex: 1,
    padding: 10,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  secondStatsColumn: {
    flex: 1,
    padding: 10,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  typeContainer: {
    marginBottom: 40,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 4,
  },
  typeEmoji: {
    fontSize: 30,
    marginRight: 12,
  },
  abilitiesContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
});
