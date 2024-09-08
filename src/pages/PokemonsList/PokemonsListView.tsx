import { FlatList, StyleSheet } from 'react-native';
import PokemonsListController from './PokemonsListController';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { PokemonData } from '../../types';

export default class PokemonsListView extends PokemonsListController {
  renderPokemonCard = ({ item }: { item: PokemonData; }) => (
    <Card
      style={styles.card}

    >
      <Card.Title title={item.name} />
    </Card>
  );

  render() {
    const { pokemons, isLoading, error } = this.state;


    return (
      <SafeAreaView>
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
            return <Text>Error: {error}</Text>;
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
  card: {
    backgroundColor: '#222222',
  }

});
