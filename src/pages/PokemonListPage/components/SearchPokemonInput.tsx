import { StyleSheet, TextInput } from 'react-native';
import { Colors, ColorsName } from '../../../assets/colors/colors';
import SearchPokemonInputController from './SearchPokemonInputController';

export class SearchPokemonInput extends SearchPokemonInputController {
  render() {
    return (
      <TextInput
        placeholder={'Search your pokemon here'}
        placeholderTextColor={Colors[ColorsName.TEXT_PLACEHOLDER]}
        style={styles.input}
        {...this.props}
        onChangeText={this.onChangeText}
      />
    );
  }
}

export default SearchPokemonInput;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: Colors[ColorsName.BG_INPUT],
    fontWeight: '700',
    fontSize: 14,
    color: Colors[ColorsName.TEXT_DEFAULT],
    borderRadius: 5,
    height: 40,
  },
});
