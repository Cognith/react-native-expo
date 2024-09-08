import { FlatList, StyleSheet, View } from 'react-native';
import PokemonsListController from './PokemonsListController';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { PokemonData } from '../../types';
import { PText } from '../../components';
import { Image } from 'react-native';

export default class PokemonsListView extends PokemonsListController {
  renderPokemonCard = ({ item }: { item: PokemonData; }) => (
    <View style={styles.card}>
      <PText>{item.id}</PText>
      <View>
        <Image
          source={{
            uri: item.image,
            width: 50,
            height: 50,

          }}
        />
      </View>
      <PText>{item.name}</PText>
      <View>
        <View>
          <PText>{item.types[0]}</PText>
        </View>
      </View>
    </View>
  );

  render() {
    const { pokemons, isLoading, error } = this.state;

    return (
      <SafeAreaView style={styles.page}>
        {(() => {
          if (isLoading && !pokemons.length) {
            return (
              <ActivityIndicator
                size={200}
                color="#FF0000"
              />
            );
          }

          if (error) {
            return <PText>Error: {error}</PText>;
          }

          return (
            <FlatList
              keyExtractor={({ id }) => id.toString()}
              data={pokemons}
              renderItem={this.renderPokemonCard}
            />
          );
        })()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#111111',
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#222222',
  }
});
