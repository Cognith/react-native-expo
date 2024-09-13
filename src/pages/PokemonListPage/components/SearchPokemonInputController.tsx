import { PureComponent } from 'react';
import { TextInputProps } from 'react-native';

interface SearchPokemonInputControllerProps extends TextInputProps {}

interface SearchPokemonInputControllerState {}

export class SearchPokemonInputController extends PureComponent<
  SearchPokemonInputControllerProps,
  SearchPokemonInputControllerState
> {
  constructor(props: SearchPokemonInputControllerProps) {
    super(props);
    this.state = {};
  }
  timeout: NodeJS.Timeout | null = null;

  onChangeText = (text: string) => {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.onChangeText && this.props.onChangeText(text);
    }, 300);
  };
}

export default SearchPokemonInputController;
