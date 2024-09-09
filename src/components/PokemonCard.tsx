import { Component } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { PText } from '.';
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
        onPress={() => this.props.onPress(this.props.data)}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <PText style={styles.cardID}>{`#${id}`}</PText>
        <Image
          style={styles.cardImage}
          source={{
            uri: image,
            width: 150,
            height: 150,
          }}
        />
        <PText style={styles.cardTitle}>{name.toUpperCase()}</PText>
        <View style={styles.cardTypes}>
          {types.map((type) => (
            <View
              key={type}
              style={styles.cardTypeItem}
            >
              <PText style={styles.cardTypeText}>{type.toUpperCase()}</PText>
            </View>
          ))}
        </View>
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
  cardID: {
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  cardTypeText: {
    fontSize: 12,
  },
});
