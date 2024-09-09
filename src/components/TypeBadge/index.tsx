import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { POKEMON_TYPES } from "../../constanst";

interface Props {
  type: string;
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
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 2,
    marginRight: 4,
    flexShrink: 1,
  },
  text: {
    fontSize: 10,
    color: "white",
    textTransform: "uppercase",
  },
});
