import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SCREEN_WIDTH, POKEMON_TYPES } from "../../constanst";

interface Props {
  type: string | undefined;
}

class TypeBadge extends Component<Props> {
  render() {
    const { type } = this.props;
    const typeDetail = POKEMON_TYPES.find((element) => element.name === type);
    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          { backgroundColor: typeDetail?.color },
        ])}
      >
        <Text style={styles.text}>{type}</Text>
      </View>
    );
  }
}

export default TypeBadge;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.18,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 2,
  },
  text: {
    fontSize: 10,
    fontWeight: "600",
    color: "white",
    textTransform: "uppercase",
  },
});
