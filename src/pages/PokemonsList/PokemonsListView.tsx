import { FlatList, StyleSheet, View } from 'react-native';
import PokemonsListController from './PokemonsListController';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { PokemonCard, PText } from '../../components';

export default class PokemonsListView extends PokemonsListController {
  render() {
    const { pokemons, isLoading, error } = this.state;

    return (
      <SafeAreaView style={styles.base}>
        <View style={styles.page}>
          {(() => {
            if (isLoading && !pokemons.length) {
              return (
                <ActivityIndicator
                  style={styles.loader}
                  size={200}
                  color="#444444"
                />
              );
            }

            if (error) {
              return (
                <View style={styles.error}>
                  <PText>Error: {error}</PText>
                </View>
              );
            }

            return (
              <FlatList
                keyExtractor={({ id }) => id.toString()}
                data={pokemons}
                renderItem={({ item }) => (
                  <PokemonCard
                    data={item}
                    onPress={() => {
                      console.log('TEST');
                    }}
                  />
                )}
                numColumns={2}
              />
            );
          })()}
        </View>
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

  /* States */
  loader: {
    margin: 'auto',
  },
  error: {
    margin: 'auto',
  },
});
