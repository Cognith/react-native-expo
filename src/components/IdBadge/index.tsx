import { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { POKEMON_TYPES } from "../../constanst";

interface Props {
  type: string | undefined;
  formattedId: string | undefined;
}

export class IdBadge extends Component<Props> {
  render() {
    console.log("[d] IdBadge");
    console.log("[d] IdBadge");
    const { formattedId, type } = this.props;
    const typeDetail = POKEMON_TYPES.find((element) => element.name === type);
    return (
      <View style={styles.container}>
        <View
          style={StyleSheet.flatten([
            styles.typeCircle,
            { backgroundColor: typeDetail?.color },
          ])}
        />
        <Text style={styles.IDText}>#{formattedId}</Text>
      </View>
    );
  }
}

export default IdBadge;

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 10,
    backgroundColor: "#06D001",
    marginRight: 3,
  },
  IDText: { fontSize: 10, color: "#ECDFCC" },
});
