import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PText from './PText';

// Props
interface Props {
  data: string[];
  title?: string;
  isCompact?: boolean;
}

export default class PokemonTags extends Component<Props> {
  static defaultProps = {
    isCompact: false,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { data, title, isCompact } = this.props;

    return (
      <View>
        {title && <PText style={styles.title}>{title}</PText>}
        <View style={styles.list}>
          {data.map((type) => (
            <View
              key={type}
              style={styles.item}
            >
              <PText
                style={{
                  fontSize: isCompact ? 12 : 14,
                }}
              >
                {type.toUpperCase()}
              </PText>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 8,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  item: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
});
