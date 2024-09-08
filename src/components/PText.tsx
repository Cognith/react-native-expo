import { Component } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

class PText extends Component<TextProps> {

  render() {
    return (
      <Text
        {...this.props}
        style={[styles.text, this.props.style]}
      >
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontFamily: 'Quicksand',
    fontSize: 16,
  }
});

export default PText;
