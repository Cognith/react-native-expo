import { DetailCards, PokemonTags, PText } from '../../components';
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
    const { id, name, height, weight, image, stats, abilities, types } =
      this.getPokemonData();

    return (
      <SafeAreaView style={styles.base}>
        <ScrollView style={styles.page}>
          <PText style={styles.id}>{`#${id}`}</PText>
          <Image
            style={styles.image}
            source={{
              uri: image,
              width: 250,
              height: 250,
            }}
          />

          {/* Details */}
          <PText style={styles.title}>{name.toUpperCase()}</PText>
          <View style={styles.dataBox}>
            {/* Types */}
            <PokemonTags
              title="Pokemon Type"
              data={types}
            />

            {/* Stats */}
            <DetailCards data={stats} />

            {/* Abilities */}
            <DetailCards
              data={[
                {
                  key: 'height',
                  value: height + 'm',
                },
                {
                  key: 'weight',
                  value: weight + 'kg',
                },
              ]}
            />

            {/* Types */}
            <PokemonTags
              title="Abilities"
              data={abilities}
            />
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
  id: {
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
  },
  image: {
    display: 'flex',
    flex: 1,
    margin: 8,
    width: 'auto',
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  dataBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    gap: 24,
    marginVertical: 24,
    padding: 24,
    borderRadius: 16,
  },
});
