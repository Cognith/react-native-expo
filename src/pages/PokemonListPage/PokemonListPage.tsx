import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors, ColorsName } from '../../assets/colors/colors';
import IPokemon from '../../interfaces/IPokemon';
import PokemonListController from './PokemonListController';
import SearchPokemonInput from './components/SearchPokemonInput';

export default class PokemonListPage extends PokemonListController {
  renderHeaderComponent = () => {
    return (
      <View style={styles.headerContainer} testID={'container'}>
        <SearchPokemonInput
          testID={'search_pokemon_input'}
          onChangeText={this.searchPokemon}
        />
      </View>
    );
  };

  renderItem = ({ item, index }: { item: IPokemon; index: number }) => {
    return (
      <View style={styles.cardWrapper}>
        <TouchableWithoutFeedback
          onPress={this.goToPokemonDetailPage(item.id)}
          testID={'test_pokemon_card'}
        >
          <View style={styles.cardContainer}>
            <View style={styles.pokemonIdContainer}>
              <Text style={styles.pokemonIdTitle}>{item.pokemonId}</Text>
            </View>

            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
              resizeMode={'contain'}
            />
            <View style={styles.cardBottomContainer}>
              <Text style={styles.pokemonName}>{item.name.toUpperCase()}</Text>

              <View style={styles.pokemonTypesWrapper}>
                {item.types.map((type) => (
                  <View key={type} style={styles.pokemonTypeContainer}>
                    <Text style={styles.pokemonTypeTitle}>
                      {type.toUpperCase()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderEmptyComponent = () => {
    if (this.state.isError) {
      return (
        <View>
          <Text>Something wrong! Please try again</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  renderFooterComponent = () => {
    if (this.state.pokemons.length > 0 && this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={'white'} />
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    const { filteredPokemons, isLoading } = this.state;

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <FlatList
            refreshControl={
              <RefreshControl
                testID={'refresh_control'}
                refreshing={false}
                onRefresh={this.onRefreshList}
              />
            }
            data={filteredPokemons}
            renderItem={this.renderItem}
            keyExtractor={(i, idx) => `${i.id}${idx}`}
            numColumns={2}
            onEndReached={this.fetchPokemonList}
            contentContainerStyle={styles.listContainer}
            onEndReachedThreshold={0.3}
            ListHeaderComponent={this.renderHeaderComponent}
            ListFooterComponent={this.renderFooterComponent}
            ListEmptyComponent={this.renderEmptyComponent}
            stickyHeaderIndices={[0]}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[ColorsName.BG_PAGE],
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 6,
  },
  cardWrapper: {
    padding: 8,
    width: '50%',
  },
  cardContainer: {
    backgroundColor: Colors[ColorsName.BG_CARD],
    flex: 1,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 80,
    marginVertical: 10,
  },
  pokemonName: {
    color: Colors[ColorsName.TEXT_DEFAULT],
    fontWeight: '700',
    textAlign: 'left',
  },
  loadingContainer: {
    paddingVertical: 10,
  },
  cardBottomContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 3,
    paddingBottom: 3,
  },
  pokemonTypesWrapper: {
    flexDirection: 'row',
  },
  pokemonTypeContainer: {
    borderRadius: 50,
    backgroundColor: Colors[ColorsName.GRASS],
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginRight: 8,
    marginTop: 5,
  },
  pokemonTypeTitle: {
    fontSize: 8,
    color: Colors[ColorsName.TEXT_DEFAULT],
  },
  pokemonIdContainer: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: Colors[ColorsName.BG_CONTAINER],
    alignSelf: 'flex-start',
  },
  pokemonIdTitle: {
    fontSize: 10,
    color: Colors[ColorsName.TEXT_SECONDARY],
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors[ColorsName.BG_PAGE],
  },
});
