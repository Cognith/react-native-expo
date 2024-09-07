import { Component } from 'react';
import { Navigation } from '../../types';

// Props
interface Props {
  navigation: Navigation["navigation"];
}

// State
interface State { }

export default class PokemonDetailsController extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    console.log('PokemonDetails Mount');
  };
}
