import { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import TypeBadge from "../TypeBadge";
import { Pokemon } from "../../types";
import { POKEMON_TYPES } from "../../constanst";

interface Props {
  item: Pokemon;
}

export class PokemonCard extends Component<Props> {
  render() {
    const { item } = this.props;
    const typeDetail = POKEMON_TYPES.find(
      (element) => element.name === item.types[0].name
    );
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.firstRow}>
          <View style={styles.IDContainer}>
            <View
              style={StyleSheet.flatten([
                styles.typeCircle,
                { backgroundColor: typeDetail?.color },
              ])}
            />
            <Text style={styles.IDText}>#{item.formattedId}</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <Image
            style={styles.pokemonImage}
            source={{
              uri: item.image,
            }}
          />
        </View>
        <View style={styles.thirdRow}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.fourthRow}>
          {item.types.map((item, index) => (
            <TypeBadge key={`${item}-${index}`} type={item.name} />
          ))}
        </View>
      </TouchableOpacity>
    );
  }
}

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#3C3D37",
    padding: 8,
    borderRadius: 10,
  },
  firstRow: { alignSelf: "flex-start" },
  IDContainer: {
    backgroundColor: "#40534C",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  typeCircle: {
    width: 16,
    height: 16,
    borderRadius: 30,
    backgroundColor: "#06D001",
    marginRight: 3,
  },
  IDText: { fontSize: 10, color: "#ECDFCC" },
  secondRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonImage: { width: 120, height: 120 },
  thirdRow: { marginBottom: 5 },
  nameText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  fourthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
