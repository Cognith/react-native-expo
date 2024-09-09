import { Component } from 'react';
import { Navigation, PokemonData } from '../../types';

// Props
interface Props {
  navigation: Navigation['navigation'];
  route: Navigation<{ Details: { data: PokemonData } }>['route'];
}

export default class PokemonDetailsController extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  getPokemonData = () => this.props.route.params.data;
}
