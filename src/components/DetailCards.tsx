import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PText from './PText';
import { KeyValue } from '../types';

// Props
interface Props {
  data: KeyValue[];
}

export default class DetailCards extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.box}>
        {this.props.data.map(({ key, value }) => (
          <View
            key={key}
            style={styles.data}
          >
            <PText style={{}}>{key.replace('-', ' ').toUpperCase()}</PText>
            <PText style={{}}>{value}</PText>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  data: {
    display: 'flex',
    gap: 4,
    width: '48%',
    paddingBottom: 24,
  },
});
