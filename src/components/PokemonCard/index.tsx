import { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from "react-native";
import IdBadge from "../IdBadge";
import TypeBadge from "../TypeBadge";
import { Pokemon } from "../../types";

interface Props {
  item: Pokemon;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export class PokemonCard extends Component<Props> {
  render() {
    const { item, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.firstRow}>
          <IdBadge type={item.types[0].name} formattedId={item.formattedId} />
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
