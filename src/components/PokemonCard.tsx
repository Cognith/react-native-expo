import { Component } from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { PokemonTags, PText } from '.';
import { PokemonData } from '../types';

// Props
interface Props {
  data: PokemonData;
  onPress: (data: PokemonData) => void;
}

export default class PokemonCard extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { id, name, image, types } = this.props.data;

    return (
      <Pressable
        testID={'pokemon-card_' + id}
        onPress={() => this.props.onPress(this.props.data)}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <PText style={styles.id}>{`#${id}`}</PText>
        <Image
          style={styles.image}
          source={{
            uri: image,
            width: 150,
            height: 150,
          }}
        />
        <PText
          testID="pokemon-name"
          style={styles.title}
        >
          {name.toUpperCase()}
        </PText>
        <PokemonTags
          data={types}
          isCompact
        />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    display: 'flex',
    flex: 1,
    margin: 8,
    padding: 16,
    height: 300,
    borderRadius: 16,
  },
  cardPressed: {
    backgroundColor: 'rgba(255,255,255,0.15)',
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
    paddingBottom: 16,
  },
});
