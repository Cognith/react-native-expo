import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import PokemonsListController from './PokemonsListController';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { PokemonCard, PText } from '../../components';

export default class PokemonsListView extends PokemonsListController {
  render() {
    const { pokemons, isLoading, error } = this.state;
    const { height } = Dimensions.get('window');

    return (
      <SafeAreaView style={styles.base}>
        <View style={[styles.page, { height: height }]}>
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
                numColumns={2}
                data={pokemons}
                renderItem={({ item }) => (
                  <PokemonCard
                    data={item}
                    onPress={() => {
                      this.props.navigation.push('Details', { pokemon: item });
                    }}
                  />
                )}
                onEndReached={this.fetchMorePokemon}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                  this.state.isLoading ? (
                    <PText style={styles.loadMore}>LOADING...</PText>
                  ) : null
                }
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
    padding: 24,
  },

  /* States */
  loader: {
    margin: 'auto',
  },
  error: {
    margin: 'auto',
  },

  /* Elements */
  loadMore: {
    textAlign: 'center',
    width: '100%',
    padding: 16,
  },
});
