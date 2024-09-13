import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import PokemonsListController from './PokemonsListController';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { PokemonCard, PText } from '../../components';
import { TextInput } from 'react-native-paper';

export default class PokemonsListView extends PokemonsListController {
  render() {
    const { pokemons, isLoading, error } = this.state;
    const { height } = Dimensions.get('window');

    return (
      <SafeAreaView
        testID="list-page"
        style={styles.base}
      >
        <View style={[styles.page, { height: height }]}>
          <TextInput
            testID="search-bar"
            style={styles.searchBar}
            placeholder="Search Pokemon..."
            value={this.state.search}
            onChangeText={(text) => this.handleSearch(text)}
            textColor="#FFFFFF"
            placeholderTextColor="#FFFFFF73"
            activeUnderlineColor="#FFFFFF73"
          />

          {(() => {
            if (isLoading && !pokemons.length) {
              return (
                <ActivityIndicator
                  testID="loading-indicator"
                  style={styles.loader}
                  size={200}
                  color="#444444"
                />
              );
            }

            if (error) {
              return (
                <View
                  testID="error-indicator"
                  style={styles.error}
                >
                  <PText testID="error-message">Error: {error}</PText>
                </View>
              );
            }

            return (
              <FlatList
                testID="pokemon-list"
                style={styles.list}
                keyExtractor={({ id }, index) => `${id}-${index}`}
                numColumns={2}
                data={this.filteredPokemonList()}
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
                    <PText
                      testID="load-more-indicator"
                      style={styles.loadMore}
                    >
                      LOADING...
                    </PText>
                  ) : null
                }
                ListEmptyComponent={() => (
                  <View
                    testID="empty-view"
                    style={styles.empty}
                  >
                    <PText>No Pokemon is found</PText>
                  </View>
                )}
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
    // padding: 24,
  },

  /* States */
  loader: {
    margin: 'auto',
  },
  error: {
    margin: 'auto',
  },
  empty: {
    margin: 'auto',
  },

  /* Elements */
  searchBar: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 24,
  },
  list: {
    padding: 24,
  },
  loadMore: {
    textAlign: 'center',
    width: '100%',
    padding: 16,
  },
});
