import { FlatList, StyleSheet, View } from 'react-native';
import PokemonsListController from './PokemonsListController';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { PokemonData } from '../../types';
import { PText } from '../../components';
import { Image } from 'react-native';

export default class PokemonsListView extends PokemonsListController {
  renderPokemonCard = ({ item }: { item: PokemonData }) => (
    <View style={styles.card}>
      <PText style={styles.cardID}>{`#${item.id}`}</PText>
      <Image
        style={styles.cardImage}
        source={{
          uri: item.image,
          width: 150,
          height: 150,
        }}
      />
      <PText style={styles.cardTitle}>{item.name.toUpperCase()}</PText>
      <View style={styles.cardTypes}>
        {item.types.map((type) => (
          <View
            key={type}
            style={styles.cardTypeItem}
          >
            <PText style={styles.cardTypeText}>{type.toUpperCase()}</PText>
          </View>
        ))}
      </View>
    </View>
  );

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
                renderItem={this.renderPokemonCard}
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

  /* Elements */
  card: {
    backgroundColor: '#222222',
    display: 'flex',
    flex: 1,
    margin: 8,
    padding: 16,
    height: 300,
    borderRadius: 16,
  },
  cardID: {
    fontSize: 14,
    backgroundColor: '#333333',
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
  },
  cardImage: {
    display: 'flex',
    flex: 1,
    margin: 8,
    width: 'auto',
    resizeMode: 'contain',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardTypes: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 8,
  },
  cardTypeItem: {
    backgroundColor: '#333333',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  cardTypeText: {
    fontSize: 12,
  },
});
