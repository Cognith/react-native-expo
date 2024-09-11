import { Text, TouchableOpacity } from "react-native";

import ListItemController from "./ListItemController";
import { styles } from "./styles";

export default class ListItem extends ListItemController {
  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[styles.itemWrapper, this.isEven && styles.itemSpacing]}
      >
        <Text style={styles.itemName}>
          {this.props.index + 1}.{" "}
          {this.props.item.name.charAt(0).toUpperCase() +
            this.props.item.name.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  }
}
