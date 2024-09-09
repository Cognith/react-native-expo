import { PText } from '../../components';
import PokemonDetailsController from './PokemonDetailsController';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default class PokemonDetailsView extends PokemonDetailsController {
  render() {
    const pokemon = this.getPokemonData();

    return (
      <SafeAreaView style={styles.base}>
        <ScrollView style={styles.page}>
          <PText style={styles.pokemonID}>{`#${pokemon.id}`}</PText>
          <Image
            style={styles.pokemonImage}
            source={{
              uri: pokemon.image,
              width: 250,
              height: 250,
            }}
          />

          {/* Details */}
          <PText style={styles.pokemonTitle}>
            {pokemon.name.toUpperCase()}
          </PText>
          <View style={{}}>
            {/* Types */}
            <PText style={{}}>Pokemon Type</PText>
            <View style={styles.pokemonTypes}>
              {pokemon.types.map((type) => (
                <View
                  key={type}
                  style={styles.pokemonTypeItem}
                >
                  <PText style={styles.pokemonTypeText}>
                    {type.toUpperCase()}
                  </PText>
                </View>
              ))}
            </View>

            {/* Stats */}
            <View style={{}}></View>

            {/* Abilities */}
            <View style={{}}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  /* Page Base */
  base: {
    backgroundColor: '#111111',
    display: 'flex',
    flex: 1,
  },
  page: {
    display: 'flex',
    flex: 1,
    padding: 24,
  },

  /* Elements */

  pokemonID: {
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
  },

  pokemonImage: {
    display: 'flex',
    flex: 1,
    margin: 8,
    width: 'auto',
    resizeMode: 'contain',
  },

  pokemonTitle: {
    fontWeight: 'bold',
  },

  pokemonTypes: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 8,
  },
  pokemonTypeItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  pokemonTypeText: {
    fontSize: 12,
  },

  pokemonDetails: {
    fontSize: 12,
  },
  pokemonDetailsItem: {
    fontSize: 12,
  },

  pokemonAbilities: {
    fontSize: 12,
  },
  pokemonAbilityItem: {
    fontSize: 12,
  },
});
