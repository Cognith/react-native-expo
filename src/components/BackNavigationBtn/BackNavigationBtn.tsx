import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, ColorsName } from '../../assets/colors/colors';
import BackNavigationBtnController from './BackNavigationBtnController';

export class BackNavigationBtn extends BackNavigationBtnController {
  render() {
    return (
      <TouchableOpacity onPress={this.goBack}>
        <Ionicons name={'arrow-back'} style={styles.backTitle} size={20} />
      </TouchableOpacity>
    );
  }
}

export default BackNavigationBtn;

const styles = StyleSheet.create({
  backTitle: {
    color: Colors[ColorsName.TEXT_DEFAULT],
    alignSelf: 'flex-start',
    textAlign: 'left',
    flex: 1,
  },
});
