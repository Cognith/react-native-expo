import { TextInput, StyleSheet } from "react-native";
import { Component } from "react";

interface Props {
  onChangeText: (text: string) => void;
}
export class SearchBar extends Component<Props> {
  render() {
    return (
      <TextInput
        placeholder="Search your pokemon here"
        placeholderTextColor="#ECDFCC"
        style={styles.textInput}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  textInput: {
    color: "#ECDFCC",
    backgroundColor: "#3C3D37",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
    minHeight: 40,
  },
});
